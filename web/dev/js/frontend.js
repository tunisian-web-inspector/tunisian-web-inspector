(self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || []).push([["/js/frontend"],{

/***/ "./assets/src/ts/frontend.ts":
/*!***********************************!*\
  !*** ./assets/src/ts/frontend.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"));

window.$ = window.jQuery = jquery_1["default"];

__webpack_require__(/*! bootstrap/dist/js/bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");

__webpack_require__(/*! yii2-pjax */ "./node_modules/yii2-pjax/jquery.pjax.js");

__webpack_require__(/*! ../../../vendor/yiisoft/yii2/assets/yii */ "./vendor/yiisoft/yii2/assets/yii.js");

__webpack_require__(/*! ../../../vendor/yiisoft/yii2/assets/yii.gridView */ "./vendor/yiisoft/yii2/assets/yii.gridView.js");

__webpack_require__(/*! ../../../vendor/yiisoft/yii2/assets/yii.validation */ "./vendor/yiisoft/yii2/assets/yii.validation.js");

__webpack_require__(/*! ../../../vendor/yiisoft/yii2/assets/yii.activeForm */ "./vendor/yiisoft/yii2/assets/yii.activeForm.js");

jquery_1["default"](function () {});

/***/ }),

/***/ "./vendor/yiisoft/yii2/assets/yii.activeForm.js":
/*!******************************************************!*\
  !*** ./vendor/yiisoft/yii2/assets/yii.activeForm.js ***!
  \******************************************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Yii form widget.
 *
 * This is the JavaScript widget used by the yii\widgets\ActiveForm widget.
 *
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
(function ($) {
  $.fn.yiiActiveForm = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      if (_typeof(method) === 'object' || !method) {
        return methods.init.apply(this, arguments);
      } else {
        $.error('Method ' + method + ' does not exist on jQuery.yiiActiveForm');
        return false;
      }
    }
  };

  var events = {
    /**
     * beforeValidate event is triggered before validating the whole form.
     * The signature of the event handler should be:
     *     function (event, messages, deferreds)
     * where
     *  - event: an Event object.
     *  - messages: an associative array with keys being attribute IDs and values being error message arrays
     *    for the corresponding attributes.
     *  - deferreds: an array of Deferred objects. You can use deferreds.add(callback) to add a new deferred validation.
     *
     * If the handler returns a boolean false, it will stop further form validation after this event. And as
     * a result, afterValidate event will not be triggered.
     */
    beforeValidate: 'beforeValidate',

    /**
     * afterValidate event is triggered after validating the whole form.
     * The signature of the event handler should be:
     *     function (event, messages, errorAttributes)
     * where
     *  - event: an Event object.
     *  - messages: an associative array with keys being attribute IDs and values being error message arrays
     *    for the corresponding attributes.
     *  - errorAttributes: an array of attributes that have validation errors. Please refer to attributeDefaults for the structure of this parameter.
     */
    afterValidate: 'afterValidate',

    /**
     * beforeValidateAttribute event is triggered before validating an attribute.
     * The signature of the event handler should be:
     *     function (event, attribute, messages, deferreds)
     * where
     *  - event: an Event object.
     *  - attribute: the attribute to be validated. Please refer to attributeDefaults for the structure of this parameter.
     *  - messages: an array to which you can add validation error messages for the specified attribute.
     *  - deferreds: an array of Deferred objects. You can use deferreds.add(callback) to add a new deferred validation.
     *
     * If the handler returns a boolean false, it will stop further validation of the specified attribute.
     * And as a result, afterValidateAttribute event will not be triggered.
     */
    beforeValidateAttribute: 'beforeValidateAttribute',

    /**
     * afterValidateAttribute event is triggered after validating the whole form and each attribute.
     * The signature of the event handler should be:
     *     function (event, attribute, messages)
     * where
     *  - event: an Event object.
     *  - attribute: the attribute being validated. Please refer to attributeDefaults for the structure of this parameter.
     *  - messages: an array to which you can add additional validation error messages for the specified attribute.
     */
    afterValidateAttribute: 'afterValidateAttribute',

    /**
     * beforeSubmit event is triggered before submitting the form after all validations have passed.
     * The signature of the event handler should be:
     *     function (event)
     * where event is an Event object.
     *
     * If the handler returns a boolean false, it will stop form submission.
     */
    beforeSubmit: 'beforeSubmit',

    /**
     * ajaxBeforeSend event is triggered before sending an AJAX request for AJAX-based validation.
     * The signature of the event handler should be:
     *     function (event, jqXHR, settings)
     * where
     *  - event: an Event object.
     *  - jqXHR: a jqXHR object
     *  - settings: the settings for the AJAX request
     */
    ajaxBeforeSend: 'ajaxBeforeSend',

    /**
     * ajaxComplete event is triggered after completing an AJAX request for AJAX-based validation.
     * The signature of the event handler should be:
     *     function (event, jqXHR, textStatus)
     * where
     *  - event: an Event object.
     *  - jqXHR: a jqXHR object
     *  - textStatus: the status of the request ("success", "notmodified", "error", "timeout", "abort", or "parsererror").
     */
    ajaxComplete: 'ajaxComplete',

    /**
     * afterInit event is triggered after yii activeForm init.
     * The signature of the event handler should be:
     *     function (event)
     * where
     *  - event: an Event object.
     */
    afterInit: 'afterInit'
  }; // NOTE: If you change any of these defaults, make sure you update yii\widgets\ActiveForm::getClientOptions() as well

  var defaults = {
    // whether to encode the error summary
    encodeErrorSummary: true,
    // the jQuery selector for the error summary
    errorSummary: '.error-summary',
    // whether to perform validation before submitting the form.
    validateOnSubmit: true,
    // the container CSS class representing the corresponding attribute has validation error
    errorCssClass: 'has-error',
    // the container CSS class representing the corresponding attribute passes validation
    successCssClass: 'has-success',
    // the container CSS class representing the corresponding attribute is being validated
    validatingCssClass: 'validating',
    // the GET parameter name indicating an AJAX-based validation
    ajaxParam: 'ajax',
    // the type of data that you're expecting back from the server
    ajaxDataType: 'json',
    // the URL for performing AJAX-based validation. If not set, it will use the the form's action
    validationUrl: undefined,
    // whether to scroll to first visible error after validation.
    scrollToError: true,
    // offset in pixels that should be added when scrolling to the first error.
    scrollToErrorOffset: 0,
    // where to add validation class: container or input
    validationStateOn: 'container'
  }; // NOTE: If you change any of these defaults, make sure you update yii\widgets\ActiveField::getClientOptions() as well

  var attributeDefaults = {
    // a unique ID identifying an attribute (e.g. "loginform-username") in a form
    id: undefined,
    // attribute name or expression (e.g. "[0]content" for tabular input)
    name: undefined,
    // the jQuery selector of the container of the input field
    container: undefined,
    // the jQuery selector of the input field under the context of the form
    input: undefined,
    // the jQuery selector of the error tag under the context of the container
    error: '.help-block',
    // whether to encode the error
    encodeError: true,
    // whether to perform validation when a change is detected on the input
    validateOnChange: true,
    // whether to perform validation when the input loses focus
    validateOnBlur: true,
    // whether to perform validation when the user is typing.
    validateOnType: false,
    // number of milliseconds that the validation should be delayed when a user is typing in the input field.
    validationDelay: 500,
    // whether to enable AJAX-based validation.
    enableAjaxValidation: false,
    // function (attribute, value, messages, deferred, $form), the client-side validation function.
    validate: undefined,
    // status of the input field, 0: empty, not entered before, 1: validated, 2: pending validation, 3: validating
    status: 0,
    // whether the validation is cancelled by beforeValidateAttribute event handler
    cancelled: false,
    // the value of the input
    value: undefined,
    // whether to update aria-invalid attribute after validation
    updateAriaInvalid: true
  };
  var submitDefer;

  var setSubmitFinalizeDefer = function setSubmitFinalizeDefer($form) {
    submitDefer = $.Deferred();
    $form.data('yiiSubmitFinalizePromise', submitDefer.promise());
  }; // finalize yii.js $form.submit


  var submitFinalize = function submitFinalize($form) {
    if (submitDefer) {
      submitDefer.resolve();
      submitDefer = undefined;
      $form.removeData('yiiSubmitFinalizePromise');
    }
  };

  var methods = {
    init: function init(attributes, options) {
      return this.each(function () {
        var $form = $(this);

        if ($form.data('yiiActiveForm')) {
          return;
        }

        var settings = $.extend({}, defaults, options || {});

        if (settings.validationUrl === undefined) {
          settings.validationUrl = $form.attr('action');
        }

        $.each(attributes, function (i) {
          attributes[i] = $.extend({
            value: getValue($form, this)
          }, attributeDefaults, this);
          watchAttribute($form, attributes[i]);
        });
        $form.data('yiiActiveForm', {
          settings: settings,
          attributes: attributes,
          submitting: false,
          validated: false,
          options: getFormOptions($form)
        });
        /**
         * Clean up error status when the form is reset.
         * Note that $form.on('reset', ...) does work because the "reset" event does not bubble on IE.
         */

        $form.on('reset.yiiActiveForm', methods.resetForm);

        if (settings.validateOnSubmit) {
          $form.on('mouseup.yiiActiveForm keyup.yiiActiveForm', ':submit', function () {
            $form.data('yiiActiveForm').submitObject = $(this);
          });
          $form.on('submit.yiiActiveForm', methods.submitForm);
        }

        var event = $.Event(events.afterInit);
        $form.trigger(event);
      });
    },
    // add a new attribute to the form dynamically.
    // please refer to attributeDefaults for the structure of attribute
    add: function add(attribute) {
      var $form = $(this);
      attribute = $.extend({
        value: getValue($form, attribute)
      }, attributeDefaults, attribute);
      $form.data('yiiActiveForm').attributes.push(attribute);
      watchAttribute($form, attribute);
    },
    // remove the attribute with the specified ID from the form
    remove: function remove(id) {
      var $form = $(this),
          attributes = $form.data('yiiActiveForm').attributes,
          index = -1,
          attribute = undefined;
      $.each(attributes, function (i) {
        if (attributes[i]['id'] == id) {
          index = i;
          attribute = attributes[i];
          return false;
        }
      });

      if (index >= 0) {
        attributes.splice(index, 1);
        unwatchAttribute($form, attribute);
      }

      return attribute;
    },
    // manually trigger the validation of the attribute with the specified ID
    validateAttribute: function validateAttribute(id) {
      var attribute = methods.find.call(this, id);

      if (attribute != undefined) {
        _validateAttribute($(this), attribute, true);
      }
    },
    // find an attribute config based on the specified attribute ID
    find: function find(id) {
      var attributes = $(this).data('yiiActiveForm').attributes,
          result = undefined;
      $.each(attributes, function (i) {
        if (attributes[i]['id'] == id) {
          result = attributes[i];
          return false;
        }
      });
      return result;
    },
    destroy: function destroy() {
      return this.each(function () {
        $(this).off('.yiiActiveForm');
        $(this).removeData('yiiActiveForm');
      });
    },
    data: function data() {
      return this.data('yiiActiveForm');
    },
    // validate all applicable inputs in the form
    validate: function validate(forceValidate) {
      if (forceValidate) {
        $(this).data('yiiActiveForm').submitting = true;
      }

      var $form = $(this),
          data = $form.data('yiiActiveForm'),
          needAjaxValidation = false,
          messages = {},
          deferreds = deferredArray(),
          submitting = data.submitting;

      if (submitting) {
        var event = $.Event(events.beforeValidate);
        $form.trigger(event, [messages, deferreds]);

        if (event.result === false) {
          data.submitting = false;
          submitFinalize($form);
          return;
        }
      } // client-side validation


      $.each(data.attributes, function () {
        this.$form = $form;
        var $input = findInput($form, this);
        var disabled = $input.toArray().reduce(function (result, next) {
          return result && $(next).is(':disabled');
        }, true);

        if (disabled) {
          return true;
        } // validate markup for select input


        if ($input.length && $input[0].tagName.toLowerCase() === 'select') {
          var opts = $input[0].options,
              isEmpty = !opts || !opts.length,
              isRequired = $input.attr('required'),
              isMultiple = $input.attr('multiple'),
              size = $input.attr('size') || 1; // check if valid HTML markup for select input, else return validation as `true`
          // https://w3c.github.io/html-reference/select.html

          if (isRequired && !isMultiple && parseInt(size, 10) === 1) {
            // invalid select markup condition
            if (isEmpty) {
              // empty option elements for the select
              return true;
            }

            if (opts[0] && opts[0].value !== '' && opts[0].text !== '') {
              // first option is not empty
              return true;
            }
          }
        }

        this.cancelled = false; // perform validation only if the form is being submitted or if an attribute is pending validation

        if (data.submitting || this.status === 2 || this.status === 3) {
          var msg = messages[this.id];

          if (msg === undefined) {
            msg = [];
            messages[this.id] = msg;
          }

          var event = $.Event(events.beforeValidateAttribute);
          $form.trigger(event, [this, msg, deferreds]);

          if (event.result !== false) {
            if (this.validate) {
              this.validate(this, getValue($form, this), msg, deferreds, $form);
            }

            if (this.enableAjaxValidation) {
              needAjaxValidation = true;
            }
          } else {
            this.cancelled = true;
          }
        }
      }); // ajax validation

      $.when.apply(this, deferreds).always(function () {
        // Remove empty message arrays
        for (var i in messages) {
          if (0 === messages[i].length) {
            delete messages[i];
          }
        }

        if (needAjaxValidation && ($.isEmptyObject(messages) || data.submitting)) {
          var $button = data.submitObject,
              extData = '&' + data.settings.ajaxParam + '=' + $form.attr('id');

          if ($button && $button.length && $button.attr('name')) {
            extData += '&' + $button.attr('name') + '=' + $button.attr('value');
          }

          $.ajax({
            url: data.settings.validationUrl,
            type: $form.attr('method'),
            data: $form.serialize() + extData,
            dataType: data.settings.ajaxDataType,
            complete: function complete(jqXHR, textStatus) {
              $form.trigger(events.ajaxComplete, [jqXHR, textStatus]);
            },
            beforeSend: function beforeSend(jqXHR, settings) {
              $form.trigger(events.ajaxBeforeSend, [jqXHR, settings]);
            },
            success: function success(msgs) {
              if (msgs !== null && _typeof(msgs) === 'object') {
                $.each(data.attributes, function () {
                  if (!this.enableAjaxValidation || this.cancelled) {
                    delete msgs[this.id];
                  }
                });
                updateInputs($form, $.extend(messages, msgs), submitting);
              } else {
                updateInputs($form, messages, submitting);
              }
            },
            error: function error() {
              data.submitting = false;
              submitFinalize($form);
            }
          });
        } else {
          if (data.submitting) {
            // delay callback so that the form can be submitted without problem
            window.setTimeout(function () {
              updateInputs($form, messages, submitting);
            }, 200);
          } else {
            updateInputs($form, messages, submitting);
          }
        }
      });
    },
    submitForm: function submitForm() {
      var $form = $(this),
          data = $form.data('yiiActiveForm');

      if (data.validated) {
        // Second submit's call (from validate/updateInputs)
        data.submitting = false;
        var event = $.Event(events.beforeSubmit);
        $form.trigger(event);

        if (event.result === false) {
          data.validated = false;
          submitFinalize($form);
          return false;
        }

        updateHiddenButton($form);
        return true; // continue submitting the form since validation passes
      } else {
        // First submit's call (from yii.js/handleAction) - execute validating
        setSubmitFinalizeDefer($form);

        if (data.settings.timer !== undefined) {
          clearTimeout(data.settings.timer);
        }

        data.submitting = true;
        methods.validate.call($form);
        return false;
      }
    },
    resetForm: function resetForm() {
      var $form = $(this);
      var data = $form.data('yiiActiveForm'); // Because we bind directly to a form reset event instead of a reset button (that may not exist),
      // when this function is executed form input values have not been reset yet.
      // Therefore we do the actual reset work through setTimeout.

      window.setTimeout(function () {
        $.each(data.attributes, function () {
          // Without setTimeout() we would get the input values that are not reset yet.
          this.value = getValue($form, this);
          this.status = 0;
          var $container = $form.find(this.container),
              $input = findInput($form, this),
              $errorElement = data.settings.validationStateOn === 'input' ? $input : $container;
          $errorElement.removeClass(data.settings.validatingCssClass + ' ' + data.settings.errorCssClass + ' ' + data.settings.successCssClass);
          $container.find(this.error).html('');
        });
        $form.find(data.settings.errorSummary).hide().find('ul').html('');
      }, 1);
    },

    /**
     * Updates error messages, input containers, and optionally summary as well.
     * If an attribute is missing from messages, it is considered valid.
     * @param messages array the validation error messages, indexed by attribute IDs
     * @param summary whether to update summary as well.
     */
    updateMessages: function updateMessages(messages, summary) {
      var $form = $(this);
      var data = $form.data('yiiActiveForm');
      $.each(data.attributes, function () {
        updateInput($form, this, messages);
      });

      if (summary) {
        updateSummary($form, messages);
      }
    },

    /**
     * Updates error messages and input container of a single attribute.
     * If messages is empty, the attribute is considered valid.
     * @param id attribute ID
     * @param messages array with error messages
     */
    updateAttribute: function updateAttribute(id, messages) {
      var attribute = methods.find.call(this, id);

      if (attribute != undefined) {
        var msg = {};
        msg[id] = messages;
        updateInput($(this), attribute, msg);
      }
    }
  };

  var watchAttribute = function watchAttribute($form, attribute) {
    var $input = findInput($form, attribute);

    if (attribute.validateOnChange) {
      $input.on('change.yiiActiveForm', function () {
        _validateAttribute($form, attribute, false);
      });
    }

    if (attribute.validateOnBlur) {
      $input.on('blur.yiiActiveForm', function () {
        if (attribute.status == 0 || attribute.status == 1) {
          _validateAttribute($form, attribute, true);
        }
      });
    }

    if (attribute.validateOnType) {
      $input.on('keyup.yiiActiveForm', function (e) {
        if ($.inArray(e.which, [16, 17, 18, 37, 38, 39, 40]) !== -1) {
          return;
        }

        if (attribute.value !== getValue($form, attribute)) {
          _validateAttribute($form, attribute, false, attribute.validationDelay);
        }
      });
    }
  };

  var unwatchAttribute = function unwatchAttribute($form, attribute) {
    findInput($form, attribute).off('.yiiActiveForm');
  };

  var _validateAttribute = function _validateAttribute($form, attribute, forceValidate, validationDelay) {
    var data = $form.data('yiiActiveForm');

    if (forceValidate) {
      attribute.status = 2;
    }

    $.each(data.attributes, function () {
      if (!isEqual(this.value, getValue($form, this))) {
        this.status = 2;
        forceValidate = true;
      }
    });

    if (!forceValidate) {
      return;
    }

    if (data.settings.timer !== undefined) {
      clearTimeout(data.settings.timer);
    }

    data.settings.timer = window.setTimeout(function () {
      if (data.submitting || $form.is(':hidden')) {
        return;
      }

      $.each(data.attributes, function () {
        if (this.status === 2) {
          this.status = 3;
          var $container = $form.find(this.container),
              $input = findInput($form, this);
          var $errorElement = data.settings.validationStateOn === 'input' ? $input : $container;
          $errorElement.addClass(data.settings.validatingCssClass);
        }
      });
      methods.validate.call($form);
    }, validationDelay ? validationDelay : 200);
  };
  /**
   * Compares two value whatever it objects, arrays or simple types
   * @param val1
   * @param val2
   * @returns boolean
   */


  var isEqual = function isEqual(val1, val2) {
    // objects
    if (val1 instanceof Object) {
      return isObjectsEqual(val1, val2);
    } // arrays


    if (Array.isArray(val1)) {
      return isArraysEqual(val1, val2);
    } // simple types


    return val1 === val2;
  };
  /**
   * Compares two objects
   * @param obj1
   * @param obj2
   * @returns boolean
   */


  var isObjectsEqual = function isObjectsEqual(obj1, obj2) {
    if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) {
      return false;
    }

    var keys1 = Object.keys(obj1);
    var keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (var i = 0; i < keys1.length; i += 1) {
      if (!obj2.hasOwnProperty(keys1[i])) {
        return false;
      }

      if (obj1[keys1[i]] !== obj2[keys1[i]]) {
        return false;
      }
    }

    return true;
  };
  /**
   * Compares two arrays
   * @param arr1
   * @param arr2
   * @returns boolean
   */


  var isArraysEqual = function isArraysEqual(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
      return false;
    }

    if (arr1.length !== arr2.length) {
      return false;
    }

    for (var i = 0; i < arr1.length; i += 1) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  };
  /**
   * Returns an array prototype with a shortcut method for adding a new deferred.
   * The context of the callback will be the deferred object so it can be resolved like ```this.resolve()```
   * @returns Array
   */


  var deferredArray = function deferredArray() {
    var array = [];

    array.add = function (callback) {
      this.push(new $.Deferred(callback));
    };

    return array;
  };

  var buttonOptions = ['action', 'target', 'method', 'enctype'];
  /**
   * Returns current form options
   * @param $form
   * @returns object Object with button of form options
   */

  var getFormOptions = function getFormOptions($form) {
    var attributes = {};

    for (var i = 0; i < buttonOptions.length; i++) {
      attributes[buttonOptions[i]] = $form.attr(buttonOptions[i]);
    }

    return attributes;
  };
  /**
   * Applies temporary form options related to submit button
   * @param $form the form jQuery object
   * @param $button the button jQuery object
   */


  var applyButtonOptions = function applyButtonOptions($form, $button) {
    for (var i = 0; i < buttonOptions.length; i++) {
      var value = $button.attr('form' + buttonOptions[i]);

      if (value) {
        $form.attr(buttonOptions[i], value);
      }
    }
  };
  /**
   * Restores original form options
   * @param $form the form jQuery object
   */


  var restoreButtonOptions = function restoreButtonOptions($form) {
    var data = $form.data('yiiActiveForm');

    for (var i = 0; i < buttonOptions.length; i++) {
      $form.attr(buttonOptions[i], data.options[buttonOptions[i]] || null);
    }
  };
  /**
   * Updates the error messages and the input containers for all applicable attributes
   * @param $form the form jQuery object
   * @param messages array the validation error messages
   * @param submitting whether this method is called after validation triggered by form submission
   */


  var updateInputs = function updateInputs($form, messages, submitting) {
    var data = $form.data('yiiActiveForm');

    if (data === undefined) {
      return false;
    }

    var errorAttributes = [],
        $input;
    $.each(data.attributes, function () {
      var hasError = submitting && updateInput($form, this, messages) || !submitting && attrHasError($form, this, messages);
      $input = findInput($form, this);

      if (!$input.is(':disabled') && !this.cancelled && hasError) {
        errorAttributes.push(this);
      }
    });
    $form.trigger(events.afterValidate, [messages, errorAttributes]);

    if (submitting) {
      updateSummary($form, messages);

      if (errorAttributes.length) {
        if (data.settings.scrollToError) {
          var h = $(document).height(),
              top = $form.find($.map(errorAttributes, function (attribute) {
            return attribute.input;
          }).join(',')).first().closest(':visible').offset().top - data.settings.scrollToErrorOffset;
          top = top < 0 ? 0 : top > h ? h : top;
          var wtop = $(window).scrollTop();

          if (top < wtop || top > wtop + $(window).height()) {
            $(window).scrollTop(top);
          }
        }

        data.submitting = false;
      } else {
        data.validated = true;

        if (data.submitObject) {
          applyButtonOptions($form, data.submitObject);
        }

        $form.submit();

        if (data.submitObject) {
          restoreButtonOptions($form);
        }
      }
    } else {
      $.each(data.attributes, function () {
        if (!this.cancelled && (this.status === 2 || this.status === 3)) {
          updateInput($form, this, messages);
        }
      });
    }

    submitFinalize($form);
  };
  /**
   * Updates hidden field that represents clicked submit button.
   * @param $form the form jQuery object.
   */


  var updateHiddenButton = function updateHiddenButton($form) {
    var data = $form.data('yiiActiveForm');
    var $button = data.submitObject || $form.find(':submit:first'); // TODO: if the submission is caused by "change" event, it will not work

    if ($button.length && $button.attr('type') == 'submit' && $button.attr('name')) {
      // simulate button input value
      var $hiddenButton = $('input[type="hidden"][name="' + $button.attr('name') + '"]', $form);

      if (!$hiddenButton.length) {
        $('<input>').attr({
          type: 'hidden',
          name: $button.attr('name'),
          value: $button.attr('value')
        }).appendTo($form);
      } else {
        $hiddenButton.attr('value', $button.attr('value'));
      }
    }
  };
  /**
   * Updates the error message and the input container for a particular attribute.
   * @param $form the form jQuery object
   * @param attribute object the configuration for a particular attribute.
   * @param messages array the validation error messages
   * @return boolean whether there is a validation error for the specified attribute
   */


  var updateInput = function updateInput($form, attribute, messages) {
    var data = $form.data('yiiActiveForm'),
        $input = findInput($form, attribute),
        hasError = attrHasError($form, attribute, messages);

    if (!$.isArray(messages[attribute.id])) {
      messages[attribute.id] = [];
    }

    attribute.status = 1;

    if ($input.length) {
      var $container = $form.find(attribute.container);
      var $error = $container.find(attribute.error);
      updateAriaInvalid($form, attribute, hasError);
      var $errorElement = data.settings.validationStateOn === 'input' ? $input : $container;

      if (hasError) {
        if (attribute.encodeError) {
          $error.text(messages[attribute.id][0]);
        } else {
          $error.html(messages[attribute.id][0]);
        }

        $errorElement.removeClass(data.settings.validatingCssClass + ' ' + data.settings.successCssClass).addClass(data.settings.errorCssClass);
      } else {
        $error.empty();
        $errorElement.removeClass(data.settings.validatingCssClass + ' ' + data.settings.errorCssClass + ' ').addClass(data.settings.successCssClass);
      }

      attribute.value = getValue($form, attribute);
    }

    $form.trigger(events.afterValidateAttribute, [attribute, messages[attribute.id]]);
    return hasError;
  };
  /**
   * Checks if a particular attribute has an error
   * @param $form the form jQuery object
   * @param attribute object the configuration for a particular attribute.
   * @param messages array the validation error messages
   * @return boolean whether there is a validation error for the specified attribute
   */


  var attrHasError = function attrHasError($form, attribute, messages) {
    var $input = findInput($form, attribute),
        hasError = false;

    if (!$.isArray(messages[attribute.id])) {
      messages[attribute.id] = [];
    }

    if ($input.length) {
      hasError = messages[attribute.id].length > 0;
    }

    return hasError;
  };
  /**
   * Updates the error summary.
   * @param $form the form jQuery object
   * @param messages array the validation error messages
   */


  var updateSummary = function updateSummary($form, messages) {
    var data = $form.data('yiiActiveForm'),
        $summary = $form.find(data.settings.errorSummary),
        $ul = $summary.find('ul').empty();

    if ($summary.length && messages) {
      $.each(data.attributes, function () {
        if ($.isArray(messages[this.id]) && messages[this.id].length) {
          var error = $('<li/>');

          if (data.settings.encodeErrorSummary) {
            error.text(messages[this.id][0]);
          } else {
            error.html(messages[this.id][0]);
          }

          $ul.append(error);
        }
      });
      $summary.toggle($ul.find('li').length > 0);
    }
  };

  var getValue = function getValue($form, attribute) {
    var $input = findInput($form, attribute);
    var type = $input.attr('type');

    if (type === 'checkbox' || type === 'radio') {
      var $realInput = $input.filter(':checked');

      if ($realInput.length > 1) {
        var values = [];
        $realInput.each(function (index) {
          values.push($($realInput.get(index)).val());
        });
        return values;
      }

      if (!$realInput.length) {
        $realInput = $form.find('input[type=hidden][name="' + $input.attr('name') + '"]');
      }

      return $realInput.val();
    } else {
      return $input.val();
    }
  };

  var findInput = function findInput($form, attribute) {
    var $input = $form.find(attribute.input);

    if ($input.length && $input[0].tagName.toLowerCase() === 'div') {
      // checkbox list or radio list
      return $input.find('input');
    } else {
      return $input;
    }
  };

  var updateAriaInvalid = function updateAriaInvalid($form, attribute, hasError) {
    if (attribute.updateAriaInvalid) {
      $form.find(attribute.input).attr('aria-invalid', hasError ? 'true' : 'false');
    }
  };
})(window.jQuery);

/***/ }),

/***/ "./vendor/yiisoft/yii2/assets/yii.gridView.js":
/*!****************************************************!*\
  !*** ./vendor/yiisoft/yii2/assets/yii.gridView.js ***!
  \****************************************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Yii GridView widget.
 *
 * This is the JavaScript widget used by the yii\grid\GridView widget.
 *
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
(function ($) {
  $.fn.yiiGridView = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (_typeof(method) === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist in jQuery.yiiGridView');
      return false;
    }
  };

  var defaults = {
    filterUrl: undefined,
    filterSelector: undefined,
    filterOnFocusOut: true
  };
  var gridData = {};
  var gridEvents = {
    /**
     * beforeFilter event is triggered before filtering the grid.
     * The signature of the event handler should be:
     *     function (event)
     * where
     *  - event: an Event object.
     *
     * If the handler returns a boolean false, it will stop filter form submission after this event. As
     * a result, afterFilter event will not be triggered.
     */
    beforeFilter: 'beforeFilter',

    /**
     * afterFilter event is triggered after filtering the grid and filtered results are fetched.
     * The signature of the event handler should be:
     *     function (event)
     * where
     *  - event: an Event object.
     */
    afterFilter: 'afterFilter'
  };
  /**
   * Used for storing active event handlers and removing them later.
   * The structure of single event handler is:
   *
   * {
   *     gridViewId: {
   *         type: {
   *             event: '...',
   *             selector: '...'
   *         }
   *     }
   * }
   *
   * Used types:
   *
   * - filter, used for filtering grid with elements found by filterSelector
   * - checkRow, used for checking single row
   * - checkAllRows, used for checking all rows with according "Check all" checkbox
   *
   * event is the name of event, for example: 'change.yiiGridView'
   * selector is a jQuery selector for finding elements
   *
   * @type {{}}
   */

  var gridEventHandlers = {};
  var methods = {
    init: function init(options) {
      return this.each(function () {
        var $e = $(this);
        var settings = $.extend({}, defaults, options || {});
        var id = $e.attr('id');

        if (gridData[id] === undefined) {
          gridData[id] = {};
        }

        gridData[id] = $.extend(gridData[id], {
          settings: settings
        });
        var filterEvents = 'change.yiiGridView keydown.yiiGridView';
        var enterPressed = false;
        initEventHandler($e, 'filter', filterEvents, settings.filterSelector, function (event) {
          if (event.type === 'keydown') {
            if (event.keyCode !== 13) {
              return; // only react to enter key
            } else {
              enterPressed = true;
            }
          } else {
            // prevent processing for both keydown and change events
            if (enterPressed) {
              enterPressed = false;
              return;
            }
          }

          if (!settings.filterOnFocusOut && event.type !== 'keydown') {
            return false;
          }

          methods.applyFilter.apply($e);
          return false;
        });
      });
    },
    applyFilter: function applyFilter() {
      var $grid = $(this);
      var settings = gridData[$grid.attr('id')].settings;
      var data = {};
      $.each($(settings.filterSelector).serializeArray(), function () {
        if (!(this.name in data)) {
          data[this.name] = [];
        }

        data[this.name].push(this.value);
      });
      var namesInFilter = Object.keys(data);
      $.each(yii.getQueryParams(settings.filterUrl), function (name, value) {
        if (namesInFilter.indexOf(name) === -1 && namesInFilter.indexOf(name.replace(/\[\d*\]$/, '')) === -1) {
          if (!$.isArray(value)) {
            value = [value];
          }

          if (!(name in data)) {
            data[name] = value;
          } else {
            $.each(value, function (i, val) {
              if ($.inArray(val, data[name])) {
                data[name].push(val);
              }
            });
          }
        }
      });
      var pos = settings.filterUrl.indexOf('?');
      var url = pos < 0 ? settings.filterUrl : settings.filterUrl.substring(0, pos);
      var hashPos = settings.filterUrl.indexOf('#');

      if (pos >= 0 && hashPos >= 0) {
        url += settings.filterUrl.substring(hashPos);
      }

      $grid.find('form.gridview-filter-form').remove();
      var $form = $('<form/>', {
        action: url,
        method: 'get',
        'class': 'gridview-filter-form',
        style: 'display:none',
        'data-pjax': ''
      }).appendTo($grid);
      $.each(data, function (name, values) {
        $.each(values, function (index, value) {
          $form.append($('<input/>').attr({
            type: 'hidden',
            name: name,
            value: value
          }));
        });
      });
      var event = $.Event(gridEvents.beforeFilter);
      $grid.trigger(event);

      if (event.result === false) {
        return;
      }

      $form.submit();
      $grid.trigger(gridEvents.afterFilter);
    },
    setSelectionColumn: function setSelectionColumn(options) {
      var $grid = $(this);
      var id = $(this).attr('id');

      if (gridData[id] === undefined) {
        gridData[id] = {};
      }

      gridData[id].selectionColumn = options.name;

      if (!options.multiple || !options.checkAll) {
        return;
      }

      var checkAll = "#" + id + " input[name='" + options.checkAll + "']";
      var inputs = options['class'] ? "input." + options['class'] : "input[name='" + options.name + "']";
      var inputsEnabled = "#" + id + " " + inputs + ":enabled";
      initEventHandler($grid, 'checkAllRows', 'click.yiiGridView', checkAll, function () {
        $grid.find(inputs + ":enabled").prop('checked', this.checked).change();
      });
      initEventHandler($grid, 'checkRow', 'click.yiiGridView', inputsEnabled, function () {
        var all = $grid.find(inputs).length == $grid.find(inputs + ":checked").length;
        $grid.find("input[name='" + options.checkAll + "']").prop('checked', all).change();
      });
    },
    getSelectedRows: function getSelectedRows() {
      var $grid = $(this);
      var data = gridData[$grid.attr('id')];
      var keys = [];

      if (data.selectionColumn) {
        $grid.find("input[name='" + data.selectionColumn + "']:checked").each(function () {
          keys.push($(this).parent().closest('tr').data('key'));
        });
      }

      return keys;
    },
    destroy: function destroy() {
      var events = ['.yiiGridView', gridEvents.beforeFilter, gridEvents.afterFilter].join(' ');
      this.off(events);
      var id = $(this).attr('id');
      $.each(gridEventHandlers[id], function (type, data) {
        $(document).off(data.event, data.selector);
      });
      delete gridData[id];
      return this;
    },
    data: function data() {
      var id = $(this).attr('id');
      return gridData[id];
    }
  };
  /**
   * Used for attaching event handler and prevent of duplicating them. With each call previously attached handler of
   * the same type is removed even selector was changed.
   * @param {jQuery} $gridView According jQuery grid view element
   * @param {string} type Type of the event which acts like a key
   * @param {string} event Event name, for example 'change.yiiGridView'
   * @param {string} selector jQuery selector
   * @param {function} callback The actual function to be executed with this event
   */

  function initEventHandler($gridView, type, event, selector, callback) {
    var id = $gridView.attr('id');
    var prevHandler = gridEventHandlers[id];

    if (prevHandler !== undefined && prevHandler[type] !== undefined) {
      var data = prevHandler[type];
      $(document).off(data.event, data.selector);
    }

    if (prevHandler === undefined) {
      gridEventHandlers[id] = {};
    }

    $(document).on(event, selector, callback);
    gridEventHandlers[id][type] = {
      event: event,
      selector: selector
    };
  }
})(window.jQuery);

/***/ }),

/***/ "./vendor/yiisoft/yii2/assets/yii.js":
/*!*******************************************!*\
  !*** ./vendor/yiisoft/yii2/assets/yii.js ***!
  \*******************************************/
/***/ (() => {

/**
 * Yii JavaScript module.
 *
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */

/**
 * yii is the root module for all Yii JavaScript modules.
 * It implements a mechanism of organizing JavaScript code in modules through the function "yii.initModule()".
 *
 * Each module should be named as "x.y.z", where "x" stands for the root module (for the Yii core code, this is "yii").
 *
 * A module may be structured as follows:
 *
 * ```javascript
 * window.yii.sample = (function($) {
 *     var pub = {
 *         // whether this module is currently active. If false, init() will not be called for this module
 *         // it will also not be called for all its child modules. If this property is undefined, it means true.
 *         isActive: true,
 *         init: function() {
 *             // ... module initialization code goes here ...
 *         },
 *
 *         // ... other public functions and properties go here ...
 *     };
 *
 *     // ... private functions and properties go here ...
 *
 *     return pub;
 * })(window.jQuery);
 * ```
 *
 * Using this structure, you can define public and private functions/properties for a module.
 * Private functions/properties are only visible within the module, while public functions/properties
 * may be accessed outside of the module. For example, you can access "yii.sample.isActive".
 *
 * You must call "yii.initModule()" once for the root module of all your modules.
 */
window.yii = function ($) {
  var pub = {
    /**
     * List of JS or CSS URLs that can be loaded multiple times via AJAX requests.
     * Each item may be represented as either an absolute URL or a relative one.
     * Each item may contain a wildcard matching character `*`, that means one or more
     * any characters on the position. For example:
     *  - `/css/*.css` will match any file ending with `.css` in the `css` directory of the current web site
     *  - `http*://cdn.example.com/*` will match any files on domain `cdn.example.com`, loaded with HTTP or HTTPS
     *  - `/js/myCustomScript.js?realm=*` will match file `/js/myCustomScript.js` with defined `realm` parameter
     */
    reloadableScripts: [],

    /**
     * The selector for clickable elements that need to support confirmation and form submission.
     */
    clickableSelector: 'a, button, input[type="submit"], input[type="button"], input[type="reset"], ' + 'input[type="image"]',

    /**
     * The selector for changeable elements that need to support confirmation and form submission.
     */
    changeableSelector: 'select, input, textarea',

    /**
     * @return string|undefined the CSRF parameter name. Undefined is returned if CSRF validation is not enabled.
     */
    getCsrfParam: function getCsrfParam() {
      return $('meta[name=csrf-param]').attr('content');
    },

    /**
     * @return string|undefined the CSRF token. Undefined is returned if CSRF validation is not enabled.
     */
    getCsrfToken: function getCsrfToken() {
      return $('meta[name=csrf-token]').attr('content');
    },

    /**
     * Sets the CSRF token in the meta elements.
     * This method is provided so that you can update the CSRF token with the latest one you obtain from the server.
     * @param name the CSRF token name
     * @param value the CSRF token value
     */
    setCsrfToken: function setCsrfToken(name, value) {
      $('meta[name=csrf-param]').attr('content', name);
      $('meta[name=csrf-token]').attr('content', value);
    },

    /**
     * Updates all form CSRF input fields with the latest CSRF token.
     * This method is provided to avoid cached forms containing outdated CSRF tokens.
     */
    refreshCsrfToken: function refreshCsrfToken() {
      var token = pub.getCsrfToken();

      if (token) {
        $('form input[name="' + pub.getCsrfParam() + '"]').val(token);
      }
    },

    /**
     * Displays a confirmation dialog.
     * The default implementation simply displays a js confirmation dialog.
     * You may override this by setting `yii.confirm`.
     * @param message the confirmation message.
     * @param ok a callback to be called when the user confirms the message
     * @param cancel a callback to be called when the user cancels the confirmation
     */
    confirm: function confirm(message, ok, cancel) {
      if (window.confirm(message)) {
        !ok || ok();
      } else {
        !cancel || cancel();
      }
    },

    /**
     * Handles the action triggered by user.
     * This method recognizes the `data-method` attribute of the element. If the attribute exists,
     * the method will submit the form containing this element. If there is no containing form, a form
     * will be created and submitted using the method given by this attribute value (e.g. "post", "put").
     * For hyperlinks, the form action will take the value of the "href" attribute of the link.
     * For other elements, either the containing form action or the current page URL will be used
     * as the form action URL.
     *
     * If the `data-method` attribute is not defined, the `href` attribute (if any) of the element
     * will be assigned to `window.location`.
     *
     * Starting from version 2.0.3, the `data-params` attribute is also recognized when you specify
     * `data-method`. The value of `data-params` should be a JSON representation of the data (name-value pairs)
     * that should be submitted as hidden inputs. For example, you may use the following code to generate
     * such a link:
     *
     * ```php
     * use yii\helpers\Html;
     * use yii\helpers\Json;
     *
     * echo Html::a('submit', ['site/foobar'], [
     *     'data' => [
     *         'method' => 'post',
     *         'params' => [
     *             'name1' => 'value1',
     *             'name2' => 'value2',
     *         ],
     *     ],
     * ]);
     * ```
     *
     * @param $e the jQuery representation of the element
     * @param event Related event
     */
    handleAction: function handleAction($e, event) {
      var $form = $e.attr('data-form') ? $('#' + $e.attr('data-form')) : $e.closest('form'),
          method = !$e.data('method') && $form ? $form.attr('method') : $e.data('method'),
          action = $e.attr('href'),
          isValidAction = action && action !== '#',
          params = $e.data('params'),
          areValidParams = params && $.isPlainObject(params),
          pjax = $e.data('pjax'),
          usePjax = pjax !== undefined && pjax !== 0 && $.support.pjax,
          pjaxContainer,
          pjaxOptions = {},
          conflictParams = ['submit', 'reset', 'elements', 'length', 'name', 'acceptCharset', 'action', 'enctype', 'method', 'target']; // Forms and their child elements should not use input names or ids that conflict with properties of a form,
      // such as submit, length, or method.

      $.each(conflictParams, function (index, param) {
        if (areValidParams && params.hasOwnProperty(param)) {
          console.error("Parameter name '" + param + "' conflicts with a same named form property. " + "Please use another name.");
        }
      });

      if (usePjax) {
        pjaxContainer = $e.data('pjax-container');

        if (pjaxContainer === undefined || !pjaxContainer.length) {
          pjaxContainer = $e.closest('[data-pjax-container]').attr('id') ? '#' + $e.closest('[data-pjax-container]').attr('id') : '';
        }

        if (!pjaxContainer.length) {
          pjaxContainer = 'body';
        }

        pjaxOptions = {
          container: pjaxContainer,
          push: !!$e.data('pjax-push-state'),
          replace: !!$e.data('pjax-replace-state'),
          scrollTo: $e.data('pjax-scrollto'),
          pushRedirect: $e.data('pjax-push-redirect'),
          replaceRedirect: $e.data('pjax-replace-redirect'),
          skipOuterContainers: $e.data('pjax-skip-outer-containers'),
          timeout: $e.data('pjax-timeout'),
          originalEvent: event,
          originalTarget: $e
        };
      }

      if (method === undefined) {
        if (isValidAction) {
          usePjax ? $.pjax.click(event, pjaxOptions) : window.location.assign(action);
        } else if ($e.is(':submit') && $form.length) {
          if (usePjax) {
            $form.on('submit', function (e) {
              $.pjax.submit(e, pjaxOptions);
            });
          }

          $form.trigger('submit');
        }

        return;
      }

      var oldMethod,
          oldAction,
          newForm = !$form.length;

      if (!newForm) {
        oldMethod = $form.attr('method');
        $form.attr('method', method);

        if (isValidAction) {
          oldAction = $form.attr('action');
          $form.attr('action', action);
        }
      } else {
        if (!isValidAction) {
          action = pub.getCurrentUrl();
        }

        $form = $('<form/>', {
          method: method,
          action: action
        });
        var target = $e.attr('target');

        if (target) {
          $form.attr('target', target);
        }

        if (!/(get|post)/i.test(method)) {
          $form.append($('<input/>', {
            name: '_method',
            value: method,
            type: 'hidden'
          }));
          method = 'post';
          $form.attr('method', method);
        }

        if (/post/i.test(method)) {
          var csrfParam = pub.getCsrfParam();

          if (csrfParam) {
            $form.append($('<input/>', {
              name: csrfParam,
              value: pub.getCsrfToken(),
              type: 'hidden'
            }));
          }
        }

        $form.hide().appendTo('body');
      }

      var activeFormData = $form.data('yiiActiveForm');

      if (activeFormData) {
        // Remember the element triggered the form submission. This is used by yii.activeForm.js.
        activeFormData.submitObject = $e;
      }

      if (areValidParams) {
        $.each(params, function (name, value) {
          $form.append($('<input/>').attr({
            name: name,
            value: value,
            type: 'hidden'
          }));
        });
      }

      if (usePjax) {
        $form.on('submit', function (e) {
          $.pjax.submit(e, pjaxOptions);
        });
      }

      $form.trigger('submit');
      $.when($form.data('yiiSubmitFinalizePromise')).done(function () {
        if (newForm) {
          $form.remove();
          return;
        }

        if (oldAction !== undefined) {
          $form.attr('action', oldAction);
        }

        $form.attr('method', oldMethod);

        if (areValidParams) {
          $.each(params, function (name) {
            $('input[name="' + name + '"]', $form).remove();
          });
        }
      });
    },
    getQueryParams: function getQueryParams(url) {
      var pos = url.indexOf('?');

      if (pos < 0) {
        return {};
      }

      var pairs = $.grep(url.substring(pos + 1).split('#')[0].split('&'), function (value) {
        return value !== '';
      });
      var params = {};

      for (var i = 0, len = pairs.length; i < len; i++) {
        var pair = pairs[i].split('=');
        var name = decodeURIComponent(pair[0].replace(/\+/g, '%20'));
        var value = pair.length > 1 ? decodeURIComponent(pair[1].replace(/\+/g, '%20')) : '';

        if (!name.length) {
          continue;
        }

        if (params[name] === undefined) {
          params[name] = value || '';
        } else {
          if (!$.isArray(params[name])) {
            params[name] = [params[name]];
          }

          params[name].push(value || '');
        }
      }

      return params;
    },
    initModule: function initModule(module) {
      if (module.isActive !== undefined && !module.isActive) {
        return;
      }

      if ($.isFunction(module.init)) {
        module.init();
      }

      $.each(module, function () {
        if ($.isPlainObject(this)) {
          pub.initModule(this);
        }
      });
    },
    init: function init() {
      initCsrfHandler();
      initRedirectHandler();
      initAssetFilters();
      initDataMethods();
    },

    /**
     * Returns the URL of the current page without params and trailing slash. Separated and made public for testing.
     * @returns {string}
     */
    getBaseCurrentUrl: function getBaseCurrentUrl() {
      return window.location.protocol + '//' + window.location.host;
    },

    /**
     * Returns the URL of the current page. Used for testing, you can always call `window.location.href` manually
     * instead.
     * @returns {string}
     */
    getCurrentUrl: function getCurrentUrl() {
      return window.location.href;
    }
  };

  function initCsrfHandler() {
    // automatically send CSRF token for all AJAX requests
    $.ajaxPrefilter(function (options, originalOptions, xhr) {
      if (!options.crossDomain && pub.getCsrfParam()) {
        xhr.setRequestHeader('X-CSRF-Token', pub.getCsrfToken());
      }
    });
    pub.refreshCsrfToken();
  }

  function initRedirectHandler() {
    // handle AJAX redirection
    $(document).ajaxComplete(function (event, xhr) {
      var url = xhr && xhr.getResponseHeader('X-Redirect');

      if (url) {
        window.location.assign(url);
      }
    });
  }

  function initAssetFilters() {
    /**
     * Used for storing loaded scripts and information about loading each script if it's in the process of loading.
     * A single script can have one of the following values:
     *
     * - `undefined` - script was not loaded at all before or was loaded with error last time.
     * - `true` (boolean) -  script was successfully loaded.
     * - object - script is currently loading.
     *
     * In case of a value being an object the properties are:
     * - `xhrList` - represents a queue of XHR requests sent to the same URL (related with this script) in the same
     * small period of time.
     * - `xhrDone` - boolean, acts like a locking mechanism. When one of the XHR requests in the queue is
     * successfully completed, it will abort the rest of concurrent requests to the same URL until cleanup is done
     * to prevent possible errors and race conditions.
     * @type {{}}
     */
    var loadedScripts = {};
    $('script[src]').each(function () {
      var url = getAbsoluteUrl(this.src);
      loadedScripts[url] = true;
    });
    $.ajaxPrefilter('script', function (options, originalOptions, xhr) {
      if (options.dataType == 'jsonp') {
        return;
      }

      var url = getAbsoluteUrl(options.url),
          forbiddenRepeatedLoad = loadedScripts[url] === true && !isReloadableAsset(url),
          cleanupRunning = loadedScripts[url] !== undefined && loadedScripts[url]['xhrDone'] === true;

      if (forbiddenRepeatedLoad || cleanupRunning) {
        xhr.abort();
        return;
      }

      if (loadedScripts[url] === undefined || loadedScripts[url] === true) {
        loadedScripts[url] = {
          xhrList: [],
          xhrDone: false
        };
      }

      xhr.done(function (data, textStatus, jqXHR) {
        // If multiple requests were successfully loaded, perform cleanup only once
        if (loadedScripts[jqXHR.yiiUrl]['xhrDone'] === true) {
          return;
        }

        loadedScripts[jqXHR.yiiUrl]['xhrDone'] = true;

        for (var i = 0, len = loadedScripts[jqXHR.yiiUrl]['xhrList'].length; i < len; i++) {
          var singleXhr = loadedScripts[jqXHR.yiiUrl]['xhrList'][i];

          if (singleXhr && singleXhr.readyState !== XMLHttpRequest.DONE) {
            singleXhr.abort();
          }
        }

        loadedScripts[jqXHR.yiiUrl] = true;
      }).fail(function (jqXHR, textStatus) {
        if (textStatus === 'abort') {
          return;
        }

        delete loadedScripts[jqXHR.yiiUrl]['xhrList'][jqXHR.yiiIndex];
        var allFailed = true;

        for (var i = 0, len = loadedScripts[jqXHR.yiiUrl]['xhrList'].length; i < len; i++) {
          if (loadedScripts[jqXHR.yiiUrl]['xhrList'][i]) {
            allFailed = false;
          }
        }

        if (allFailed) {
          delete loadedScripts[jqXHR.yiiUrl];
        }
      }); // Use prefix for custom XHR properties to avoid possible conflicts with existing properties

      xhr.yiiIndex = loadedScripts[url]['xhrList'].length;
      xhr.yiiUrl = url;
      loadedScripts[url]['xhrList'][xhr.yiiIndex] = xhr;
    });
    $(document).ajaxComplete(function () {
      var styleSheets = [];
      $('link[rel=stylesheet]').each(function () {
        var url = getAbsoluteUrl(this.href);

        if (isReloadableAsset(url)) {
          return;
        }

        $.inArray(url, styleSheets) === -1 ? styleSheets.push(url) : $(this).remove();
      });
    });
  }

  function initDataMethods() {
    var handler = function handler(event) {
      var $this = $(this),
          method = $this.data('method'),
          message = $this.data('confirm'),
          form = $this.data('form');

      if (method === undefined && message === undefined && form === undefined) {
        return true;
      }

      if (message !== undefined && message !== false && message !== '') {
        $.proxy(pub.confirm, this)(message, function () {
          pub.handleAction($this, event);
        });
      } else {
        pub.handleAction($this, event);
      }

      event.stopImmediatePropagation();
      return false;
    }; // handle data-confirm and data-method for clickable and changeable elements


    $(document).on('click.yii', pub.clickableSelector, handler).on('change.yii', pub.changeableSelector, handler);
  }

  function isReloadableAsset(url) {
    for (var i = 0; i < pub.reloadableScripts.length; i++) {
      var rule = getAbsoluteUrl(pub.reloadableScripts[i]);
      var match = new RegExp("^" + escapeRegExp(rule).split('\\*').join('.+') + "$").test(url);

      if (match === true) {
        return true;
      }
    }

    return false;
  } // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex


  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }
  /**
   * Returns absolute URL based on the given URL
   * @param {string} url Initial URL
   * @returns {string}
   */


  function getAbsoluteUrl(url) {
    return url.charAt(0) === '/' ? pub.getBaseCurrentUrl() + url : url;
  }

  return pub;
}(window.jQuery);

window.jQuery(function () {
  window.yii.initModule(window.yii);
});

/***/ }),

/***/ "./vendor/yiisoft/yii2/assets/yii.validation.js":
/*!******************************************************!*\
  !*** ./vendor/yiisoft/yii2/assets/yii.validation.js ***!
  \******************************************************/
/***/ (() => {

/**
 * Yii validation module.
 *
 * This JavaScript module provides the validation methods for the built-in validators.
 *
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
yii.validation = function ($) {
  var pub = {
    isEmpty: function isEmpty(value) {
      return value === null || value === undefined || $.isArray(value) && value.length === 0 || value === '';
    },
    addMessage: function addMessage(messages, message, value) {
      messages.push(message.replace(/\{value\}/g, value));
    },
    required: function required(value, messages, options) {
      var valid = false;

      if (options.requiredValue === undefined) {
        var isString = typeof value == 'string' || value instanceof String;

        if (options.strict && value !== undefined || !options.strict && !pub.isEmpty(isString ? $.trim(value) : value)) {
          valid = true;
        }
      } else if (!options.strict && value == options.requiredValue || options.strict && value === options.requiredValue) {
        valid = true;
      }

      if (!valid) {
        pub.addMessage(messages, options.message, value);
      }
    },
    // "boolean" is a reserved keyword in older versions of ES so it's quoted for IE < 9 support
    'boolean': function boolean(value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }

      var valid = !options.strict && (value == options.trueValue || value == options.falseValue) || options.strict && (value === options.trueValue || value === options.falseValue);

      if (!valid) {
        pub.addMessage(messages, options.message, value);
      }
    },
    string: function string(value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }

      if (typeof value !== 'string') {
        pub.addMessage(messages, options.message, value);
        return;
      }

      if (options.is !== undefined && value.length != options.is) {
        pub.addMessage(messages, options.notEqual, value);
        return;
      }

      if (options.min !== undefined && value.length < options.min) {
        pub.addMessage(messages, options.tooShort, value);
      }

      if (options.max !== undefined && value.length > options.max) {
        pub.addMessage(messages, options.tooLong, value);
      }
    },
    file: function file(attribute, messages, options) {
      var files = getUploadedFiles(attribute, messages, options);
      $.each(files, function (i, file) {
        validateFile(file, messages, options);
      });
    },
    image: function image(attribute, messages, options, deferredList) {
      var files = getUploadedFiles(attribute, messages, options);
      $.each(files, function (i, file) {
        validateFile(file, messages, options); // Skip image validation if FileReader API is not available

        if (typeof FileReader === "undefined") {
          return;
        }

        var deferred = $.Deferred();
        pub.validateImage(file, messages, options, deferred, new FileReader(), new Image());
        deferredList.push(deferred);
      });
    },
    validateImage: function validateImage(file, messages, options, deferred, fileReader, image) {
      image.onload = function () {
        validateImageSize(file, image, messages, options);
        deferred.resolve();
      };

      image.onerror = function () {
        messages.push(options.notImage.replace(/\{file\}/g, file.name));
        deferred.resolve();
      };

      fileReader.onload = function () {
        image.src = this.result;
      }; // Resolve deferred if there was error while reading data


      fileReader.onerror = function () {
        deferred.resolve();
      };

      fileReader.readAsDataURL(file);
    },
    number: function number(value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }

      if (typeof value === 'string' && !options.pattern.test(value)) {
        pub.addMessage(messages, options.message, value);
        return;
      }

      if (options.min !== undefined && value < options.min) {
        pub.addMessage(messages, options.tooSmall, value);
      }

      if (options.max !== undefined && value > options.max) {
        pub.addMessage(messages, options.tooBig, value);
      }
    },
    range: function range(value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }

      if (!options.allowArray && $.isArray(value)) {
        pub.addMessage(messages, options.message, value);
        return;
      }

      var inArray = true;
      $.each($.isArray(value) ? value : [value], function (i, v) {
        if ($.inArray(v, options.range) == -1) {
          inArray = false;
          return false;
        } else {
          return true;
        }
      });

      if (options.not === undefined) {
        options.not = false;
      }

      if (options.not === inArray) {
        pub.addMessage(messages, options.message, value);
      }
    },
    regularExpression: function regularExpression(value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }

      if (!options.not && !options.pattern.test(value) || options.not && options.pattern.test(value)) {
        pub.addMessage(messages, options.message, value);
      }
    },
    email: function email(value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }

      var valid = true,
          regexp = /^((?:"?([^"]*)"?\s)?)(?:\s+)?(?:(<?)((.+)@([^>]+))(>?))$/,
          matches = regexp.exec(value);

      if (matches === null) {
        valid = false;
      } else {
        var localPart = matches[5],
            domain = matches[6];

        if (options.enableIDN) {
          localPart = punycode.toASCII(localPart);
          domain = punycode.toASCII(domain);
          value = matches[1] + matches[3] + localPart + '@' + domain + matches[7];
        }

        if (localPart.length > 64) {
          valid = false;
        } else if ((localPart + '@' + domain).length > 254) {
          valid = false;
        } else {
          valid = options.pattern.test(value) || options.allowName && options.fullPattern.test(value);
        }
      }

      if (!valid) {
        pub.addMessage(messages, options.message, value);
      }
    },
    url: function url(value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }

      if (options.defaultScheme && !/:\/\//.test(value)) {
        value = options.defaultScheme + '://' + value;
      }

      var valid = true;

      if (options.enableIDN) {
        var matches = /^([^:]+):\/\/([^\/]+)(.*)$/.exec(value);

        if (matches === null) {
          valid = false;
        } else {
          value = matches[1] + '://' + punycode.toASCII(matches[2]) + matches[3];
        }
      }

      if (!valid || !options.pattern.test(value)) {
        pub.addMessage(messages, options.message, value);
      }
    },
    trim: function trim($form, attribute, options, value) {
      var $input = $form.find(attribute.input);

      if ($input.is(':checkbox, :radio')) {
        return value;
      }

      value = $input.val();

      if (!options.skipOnEmpty || !pub.isEmpty(value)) {
        value = $.trim(value);
        $input.val(value);
      }

      return value;
    },
    captcha: function captcha(value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      } // CAPTCHA may be updated via AJAX and the updated hash is stored in body data


      var hash = $('body').data(options.hashKey);
      hash = hash == null ? options.hash : hash[options.caseSensitive ? 0 : 1];
      var v = options.caseSensitive ? value : value.toLowerCase();

      for (var i = v.length - 1, h = 0; i >= 0; --i) {
        h += v.charCodeAt(i);
      }

      if (h != hash) {
        pub.addMessage(messages, options.message, value);
      }
    },
    compare: function compare(value, messages, options, $form) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }

      var compareValue,
          valid = true;

      if (options.compareAttribute === undefined) {
        compareValue = options.compareValue;
      } else {
        var $target = $('#' + options.compareAttribute);

        if (!$target.length) {
          $target = $form.find('[name="' + options.compareAttributeName + '"]');
        }

        compareValue = $target.val();
      }

      if (options.type === 'number') {
        value = value ? parseFloat(value) : 0;
        compareValue = compareValue ? parseFloat(compareValue) : 0;
      }

      switch (options.operator) {
        case '==':
          valid = value == compareValue;
          break;

        case '===':
          valid = value === compareValue;
          break;

        case '!=':
          valid = value != compareValue;
          break;

        case '!==':
          valid = value !== compareValue;
          break;

        case '>':
          valid = value > compareValue;
          break;

        case '>=':
          valid = value >= compareValue;
          break;

        case '<':
          valid = value < compareValue;
          break;

        case '<=':
          valid = value <= compareValue;
          break;

        default:
          valid = false;
          break;
      }

      if (!valid) {
        pub.addMessage(messages, options.message, value);
      }
    },
    ip: function ip(value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }

      var negation = null,
          cidr = null,
          matches = new RegExp(options.ipParsePattern).exec(value);

      if (matches) {
        negation = matches[1] || null;
        value = matches[2];
        cidr = matches[4] || null;
      }

      if (options.subnet === true && cidr === null) {
        pub.addMessage(messages, options.messages.noSubnet, value);
        return;
      }

      if (options.subnet === false && cidr !== null) {
        pub.addMessage(messages, options.messages.hasSubnet, value);
        return;
      }

      if (options.negation === false && negation !== null) {
        pub.addMessage(messages, options.messages.message, value);
        return;
      }

      var ipVersion = value.indexOf(':') === -1 ? 4 : 6;

      if (ipVersion == 6) {
        if (!new RegExp(options.ipv6Pattern).test(value)) {
          pub.addMessage(messages, options.messages.message, value);
        }

        if (!options.ipv6) {
          pub.addMessage(messages, options.messages.ipv6NotAllowed, value);
        }
      } else {
        if (!new RegExp(options.ipv4Pattern).test(value)) {
          pub.addMessage(messages, options.messages.message, value);
        }

        if (!options.ipv4) {
          pub.addMessage(messages, options.messages.ipv4NotAllowed, value);
        }
      }
    }
  };

  function getUploadedFiles(attribute, messages, options) {
    // Skip validation if File API is not available
    if (typeof File === "undefined") {
      return [];
    }

    var fileInput = $(attribute.input, attribute.$form).get(0); // Skip validation if file input does not exist
    // (in case file inputs are added dynamically and no file input has been added to the form)

    if (typeof fileInput === "undefined") {
      return [];
    }

    var files = fileInput.files;

    if (!files) {
      messages.push(options.message);
      return [];
    }

    if (files.length === 0) {
      if (!options.skipOnEmpty) {
        messages.push(options.uploadRequired);
      }

      return [];
    }

    if (options.maxFiles && options.maxFiles < files.length) {
      messages.push(options.tooMany);
      return [];
    }

    return files;
  }

  function validateFile(file, messages, options) {
    if (options.extensions && options.extensions.length > 0) {
      var found = false;
      var filename = file.name.toLowerCase();

      for (var index = 0; index < options.extensions.length; index++) {
        var ext = options.extensions[index].toLowerCase();

        if (ext === '' && filename.indexOf('.') === -1 || filename.substr(filename.length - options.extensions[index].length - 1) === '.' + ext) {
          found = true;
          break;
        }
      }

      if (!found) {
        messages.push(options.wrongExtension.replace(/\{file\}/g, file.name));
      }
    }

    if (options.mimeTypes && options.mimeTypes.length > 0) {
      if (!validateMimeType(options.mimeTypes, file.type)) {
        messages.push(options.wrongMimeType.replace(/\{file\}/g, file.name));
      }
    }

    if (options.maxSize && options.maxSize < file.size) {
      messages.push(options.tooBig.replace(/\{file\}/g, file.name));
    }

    if (options.minSize && options.minSize > file.size) {
      messages.push(options.tooSmall.replace(/\{file\}/g, file.name));
    }
  }

  function validateMimeType(mimeTypes, fileType) {
    for (var i = 0, len = mimeTypes.length; i < len; i++) {
      if (new RegExp(mimeTypes[i]).test(fileType)) {
        return true;
      }
    }

    return false;
  }

  function validateImageSize(file, image, messages, options) {
    if (options.minWidth && image.width < options.minWidth) {
      messages.push(options.underWidth.replace(/\{file\}/g, file.name));
    }

    if (options.maxWidth && image.width > options.maxWidth) {
      messages.push(options.overWidth.replace(/\{file\}/g, file.name));
    }

    if (options.minHeight && image.height < options.minHeight) {
      messages.push(options.underHeight.replace(/\{file\}/g, file.name));
    }

    if (options.maxHeight && image.height > options.maxHeight) {
      messages.push(options.overHeight.replace(/\{file\}/g, file.name));
    }
  }

  return pub;
}(jQuery);

/***/ }),

/***/ "./assets/src/scss/vendor.scss":
/*!*************************************!*\
  !*** ./assets/src/scss/vendor.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/src/scss/theme.tww.scss":
/*!****************************************!*\
  !*** ./assets/src/scss/theme.tww.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["css/vendor","css/theme.tww","/js/vendor"], () => (__webpack_exec__("./assets/src/ts/frontend.ts"), __webpack_exec__("./assets/src/scss/vendor.scss"), __webpack_exec__("./assets/src/scss/theme.tww.scss")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=frontend.js.map
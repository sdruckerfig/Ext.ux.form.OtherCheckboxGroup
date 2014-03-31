Ext.define('MyApp.view.CheckboxOther', {
	extend: 'Ext.form.CheckboxGroup',
	alias: 'widget.checkboxgroupother',
	requires: ['MyApp.view.CheckboxOtherLayout'],
	layout: 'checkboxgroupother',
	config: {
		otherBoxLabel: 'Other :',
		otherName: ''
	},

	// private

	textfield: null,

	afterRender: function() {

		this.callParent(arguments);
		var tm = Ext.create('Ext.util.TextMetrics');
		var labelWidth = tm.getWidth(this.getOtherBoxLabel());
		var colspanEl = Ext.get(this.getEl().select('td [colspan=' + this.columns + ']').elements[0]);

		this.textfield = Ext.widget('textfield', {
			renderTo: colspanEl,
			labelWidth: labelWidth,
			margin: '10 0 0 0',
			width: '100%',
			fieldLabel: this.getOtherBoxLabel(),
			name: this.getOtherName(),
			listeners: {
				change: {
					fn: this.otherBoxChange,
					scope: this
				}
			}
		});

	},

	isDirty: function() {

		if (this.textfield.isDirty()) {
			return true;
		} else {
			return this.callParent(arguments);
		}
	},

	setReadOnly: function(readOnly) {

		this.textfield.setReadOnly(readOnly);
		this.callParent(arguments);

	},

	reset: function() {
		this.textfield.reset();
		this.callParent(arguments);
	},

	otherBoxChange: function(cmp) {
		this.validate();
	},

	resetOriginalValue: function() {
		this.textfield.resetOriginalValue();
		this.callParent(arguments);
	},

	getErrors: function() {

		var errors = [];
		if (!this.allowBlank && Ext.isEmpty(this.getChecked()) && Ext.isEmpty(this.textfield.getValue())) {
			errors.push(this.blankText);
		}
		return errors;
	},


	// setValue syntax:
	//
	// setValue(['1','2', '3', 'Other: Foo']})
	//
	//

	setValue: function(value) {

		this.callParent(arguments);

		if (Ext.isArray(fieldValue)) {
			for (var i = 0; i < fieldValue.length; i++) {
				if (Ext.isString(fieldValue[i]) && fieldValue[i].indexOf('Other: ') == 0) {
					this.textfield.setValue(fieldValue[i].substr(7));
				}
			}
		} else {
			if (Ext.isString(fieldValue) && fieldValue.indexOf('Other: ') == 0) {
				this.textfield.setValue(fieldValue.substr(7));
			}
		}

	},


	getValue: function() {

		if (!this.textfield || Ext.isEmpty(this.textfield.getValue()))
			return this.callParent();

		var tfValue = this.textfield.getValue();

		values = this.callParent(arguments);

		var currentValue = values[this.getOtherName()];

		if (!currentValue) {
			values[this.getOtherName()] = 'Other: ' + tfValue;
		} else {
			if (Ext.isArray(currentValue)) {
				currentValue.push('Other: ' + tfValue);
			} else if (currentValue != '') {
				values[this.getOtherName()] = [currentValue, 'Other: ' + tfValue];
			}
		}

		return values;
	},


	getSubmitData: function() {

		var val = new Object();

		if (!Ext.isEmpty(this.textfield.getValue())) {
			val[this.getOtherName()] = 'Other: ' + this.textfield.getValue();
			return val;
		}

	}

});
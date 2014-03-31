Ext.define('Ext.ux.form.CheckboxOther', {
	extend: 'Ext.form.CheckboxGroup',
	alias: 'widget.checkboxgroupother',
	requires: ['Ext.ux.layout.container.CheckboxOther'],
	layout: 'checkboxgroupother',
	
	config: {
		otherBoxLabel: 'Other :',
		otherName: ''
	},

	// private

	textfield: null,

	initComponent: function() {

		// prevent checkboxes from submitting
		
		for (var i=0; i<this.items.length; i++) {
			this.items[i].submitValue = false;
		}

		this.callParent(arguments);
	},

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
	// setValue({rb: ['1','2', '3', 'Other: Foo']})
	//
	//

	setValue: function(value) {

		var cb = null;

		if (!Ext.isArray(value)) {
			value = [value];
		}

		for (var i = 0; i < this.items.items.length; i++) {

			cb = this.items.items[i];

			if (Ext.Array.contains(value, cb.inputValue)) {
				cb.setValue(true);
			} else {
				cb.setValue(false);
			}

		}

		for (var i = 0; i < value.length; i++) {
			if (Ext.isString(value[i]) && value[i].indexOf('Other: ') == 0) {
				this.textfield.setValue(value[i].substr(7));
			}
		}

	},


	getValue: function() {

		var values = [];

		for (var i = 0; i < this.items.items.length; i++) {
			var cb = this.items.items[i];

			if (cb.isCheckbox && cb.getValue()) {
				values.push(cb.inputValue)
			}
		}

		if (this.textfield) {
			var tfValue = this.textfield.getValue();
			if (!Ext.isEmpty(tfValue)) {
				values.push('Other: ' + tfValue);
			}
		}

		if (values.length == 1) {
			values = values[0];
		}

		return values;
	},


	getSubmitData: function() {

		var val = new Object();
		val[this.name] = this.getValue();

		return val;

	},

	getModelData: function() {

		var val = new Object();
		val[this.name] = this.getValue();

		return val;
	}



});
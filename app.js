/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

Ext.Loader.setPath('Ext.ux', 'app/ux');

Ext.application({
	name: 'MyApp',

	extend: 'MyApp.Application',
	requires: ['Ext.ux.form.CheckboxOther'],

	launch: function() {


		Ext.define('MyApp.model.MyModel', {
			extend: 'Ext.data.Model',
			fields: ['name', 'rb']

		});

		var mymodel = Ext.create('MyApp.model.MyModel', {
			name: 'Steve Drucker',
			rb: ['1', '2', '3', 'Other: Pineapple']
		});

		var win = Ext.create('Ext.window.Window', {

			autoShow: true,
			width: 400,
			height: 300,
			layout: 'fit',

			items: [{
				xtype: 'form',
				bodyPadding: 10,
				defaults: {
					anchor: '100%'
				},
				buttons: [{
					text: 'Save',
					handler: function(b) {
						console.log(b.up('form').getValues());
					}
				}],
				items: [{
						xtype: 'textfield',
						name: 'name',
						fieldLabel: 'Enter your name'
					}, {
						xtype: 'checkboxgroupother',
						fieldLabel: 'Select Pizza Toppings',
						columns: 2,
						vertical: true,
						msgTarget: 'side',
						allowBlank: false,
						name: 'rb',

						items: [{
							boxLabel: 'Pepperoni',
							inputValue: '1'
						}, {
							boxLabel: 'Onion',
							inputValue: '2',
						}, {
							boxLabel: 'Tomato',
							inputValue: '3'
						}, {
							boxLabel: 'Roadkill',
							inputValue: '4'
						}, {
							boxLabel: 'Meatball',
							inputValue: '5'
						}, {
							boxLabel: 'Anchovies',
							inputValue: '6'
						}]
					},

					{
						xtype: 'textareafield',
						name: 'instructions',
						fieldLabel: 'Delivery Instructions',
						labelAlign: 'top'
					}

				],

			}]
		});

		win.down('form').loadRecord(mymodel);

	}
});
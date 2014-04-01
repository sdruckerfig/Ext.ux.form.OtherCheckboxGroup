Ext.define('Ext.ux.layout.container.CheckboxOther', {
    extend: 'Ext.layout.container.CheckboxGroup',
    alias: ['layout.checkboxgroupother'],
    
    renderTpl: [
        '<table id="{ownerId}-innerCt" class="' + Ext.plainTableCls + '" cellpadding="0"',
            'role="presentation" style="{tableStyle}">',
            '<tbody role="presentation"><tr role="presentation">',
            '<tpl for="columns">',
                '<td class="{parent.colCls}" valign="top" style="{style}" role="presentation">',
                    '{% this.renderColumn(out,parent,xindex-1) %}',
                '</td>',
            '</tpl>',
        '</tr>',
        '<tr><td colspan="{[values.columnCount]}" class="{colCls}" valign="top" style="{style}" role="presentation"></td></tr>',
        '</tbody>',
        '</table>'
    ]

});
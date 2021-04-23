import React from 'react';
import { Rect } from 'roosterjs-editor-types';
// import pickerStyle from './Picker.scss';
const pickerStyle = require('./Picker.scss');

export interface IItem {
    key: string;
    label: string;
}

interface IVariablePickerProps {
    items: IItem[];
    onClick(item: IItem): void;
    rect: Rect;
}

export default ({ items, rect, onClick }: IVariablePickerProps) => {
    return <ul className={pickerStyle.VariablePicker} style={{ left: `${rect.left}px`, top: `${rect.top}px` }} >
        {items.map(item => <li className={pickerStyle.VariablePickerItem} key={item.key} onClick={() => onClick(item)}>{item.label}</li>)}
    </ul>
}
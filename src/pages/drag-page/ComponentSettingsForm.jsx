import React, {Component} from 'react';
import {Alert, Form} from 'antd';
import config from '@/commons/config-hoc';
import components from './components';
import {FormElement} from '@/library/antd';
import {debounce} from 'lodash';

@config({
    event: true,
    connect: state => {
        return {
            currentNode: state.dragPage.currentNode,
        }
    },
})
@Form.create()
export default class ComponentSettings extends Component {
    handlePropsChange = debounce(() => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) return;
            const {currentNode} = this.props;
            const propsConfigs = components[currentNode.__type].props || [];

            Object.keys(values).forEach(key => {
                const config = propsConfigs.find(item => item.attribute === key);
                const value = values[key];

                if (config?.formType === 'json' && value) {
                    values[key] = JSON.parse(value);
                }
            });

            this.props.action.dragPage.setProps({
                targetId: currentNode.__id,
                newProps: values,
                propsConfigs,
            });
        })
    }, 500);

    FormElement = (props) => <FormElement form={this.props.form} labelWidth={60} disabled={this.props.isDetail} {...props}/>;

    render() {
        let {currentNode} = this.props;

        const currentComponent = components[(currentNode || {}).__type] || {};
        const props = currentComponent.props || [];

        const FormElement = this.FormElement;
        return (
            <Form>
                {currentNode ? (
                    <div>
                        <h3 style={{textAlign: 'center'}}>{currentComponent.title}</h3>
                        {props.map(item => {
                            let {
                                name,
                                attribute,
                                valueType,
                                defaultValue,
                                tabSize = 4,
                                half,
                                formType = 'input',
                                style = {},
                                visible,
                                ...others
                            } = item;

                            let initialValue = currentNode[attribute] || defaultValue;

                            if (formType === 'json' && initialValue) {
                                initialValue = JSON.stringify(initialValue, null, tabSize);
                            }

                            if (half) {
                                style.width = '50%';
                                style.float = 'left';
                            } else {
                                style.clear = 'both';
                            }

                            let isVisible = true;

                            if (visible !== void 0) isVisible = visible;

                            if (visible && typeof visible === 'function') {
                                isVisible = visible({...currentNode, ...this.props.form.getFieldsValue()});
                            }

                            if (!isVisible) return null;

                            return (
                                <FormElement
                                    key={attribute}
                                    type={formType}
                                    label={name}
                                    field={attribute}
                                    initialValue={initialValue}
                                    onChange={this.handlePropsChange}
                                    style={style}
                                    {...others}
                                />
                            );
                        })}
                        <FormElement
                            type="textarea"
                            label="备注"
                            field="__TODO"
                            initialValue={currentNode['__TODO']}
                            placeholder="特殊说明，用于给开发人员提示"
                            rows={3}
                            style={{clear: 'both'}}
                            onChange={this.handlePropsChange}
                        />
                    </div>
                ) : (
                    <Alert type="error" message="点击组件进行属性编辑"/>
                )}
            </Form>
        );
    }
}

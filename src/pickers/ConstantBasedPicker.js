import React, { Component } from "react";
import { injectIntl } from "react-intl";
import SelectInput from "../components/SelectInput";
import { formatMessage } from "../helpers/i18n";


class ConstantBasedPicker extends Component {

    state = {
        value: null
    }

    componentDidMount() {
        if (!!this.props.value) {
            this.setState({ value: this.props.value });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value })
        }
    }

    _formatValue = v => v === null ?
        formatMessage(
            this.props.intl,
            this.props.module,
            this.props.nullLabel ? this.props.nullLabel : `${this.props.label}.null`
        ) :
        formatMessage(
            this.props.intl,
            this.props.module,
            `${this.props.label}.${v}`
        )

    _onChange = v => {
        this.setState(
            { value: v },
            e => {
                this.props.onChange(
                    v,
                    this._formatValue(v)
                )
            }
        )
    }

    render() {
        const { module, withLabel=true, label, constants, name,
            filtered = [], withNull = true, readOnly = false } = this.props;
        const { value } = this.state;
        const options = withNull ? [{
            value: null,
            label: this._formatValue(null)
        }] : [];
        options.push(...constants.filter(c => !filtered.includes(c) || value === c).map(v => ({
            value: v,
            label: this._formatValue(v)
        })));
        return (
            <SelectInput
                module={module}
                label={!!withLabel && label}
                options={options}
                name={name}
                value={value}
                onChange={this._onChange}
                readOnly={readOnly}
            />
        );
    }
}

export default injectIntl(ConstantBasedPicker);
import React, {PropTypes} from 'react'
import _ from 'lodash'
import * as filepicker from 'filestack-js'

require('./FilePicker.scss')

class FilePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {dragText: props.options.dragText}
        this.onChange = this.onChange.bind(this)
    }

    onChange(event) {
        this.props.onSuccess(this.props.options.multiple ? event.fpfiles : event.fpfile)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({dragText: nextProps.options.dragText})
    }

    componentDidMount() {

        const filepickerElement = this.refs.filepicker
        const filepickerButton = this.refs.filepickerButton
        const filepickerProgress = this.refs.filepickerProgress

        const apikey = this.props.apiKey
        const clientOptions = this.props.options.cname ? {cname: this.props.options.cname} : {}
        const client = filepicker.init(apikey, clientOptions)

        const opts = {}
        opts.displayMode = 'dropPane'
        opts.container = 'filepicker-drag-drop-pane'
        opts.maxFiles = 4

        opts.storeTo = {}
        opts.storeTo.container = this.props.options.storeContainer
        opts.storeTo.region = 'us-east-1'

        opts.dropPane = {}
        opts.dropPane.customText = ' '
        opts.dropPane.overlay = false
        opts.dropPane.showIcon = false
        opts.dropPane.disableClick = true
        opts.dropPane.onDragEnter = () => {
            this.setState({dragText: 'Drop to upload'})
            filepickerElement.classList.add('drag-entered')
        }
        opts.dropPane.onDragLeave = () => {
            this.setState({dragText: this.props.options.dragText})
            filepickerElement.classList.remove('drag-entered')
        }
        opts.dropPane.onSuccess = (files) => {
            this.setState({dragText: this.props.options.dragText})
            filepickerElement.classList.remove('in-progress')
            this.props.onSuccess(this.props.options.multiple ? files : files[0])
        }
        opts.dropPane.onError = () => {
            filepickerElement.classList.remove('in-progress')
            this.setState({dragText: this.props.options.dragText})
        }
        opts.dropPane.onProgress = (percentage) => {
            filepickerElement.classList.remove('drag-entered')
            filepickerElement.classList.add('in-progress')
            filepickerProgress.style.width = percentage + '%'
        }
        opts.dropPane.onClick = () => {
            const overlayOpts = {}
            overlayOpts.maxFiles = opts.maxFiles
            overlayOpts.uploadInBackground = false
            overlayOpts.onFileUploadFinished = (files) => {
                this.props.onSuccess(this.props.options.multiple ? files : files[0])
            }
            overlayOpts.storeTo = opts.storeTo
            client.picker(overlayOpts).open()
        }

        client.picker(opts).open();

        filepickerElement.addEventListener('change', this.onChange, false)
    }

    componentWillUnmount() {
        this.refs.filepicker.removeEventListener('change', this.onChange, false)
    }

    render() {
        const {mode, options} = this.props
        const {dragText} = this.state

        // add data-fp- prefix to all keys
        const opts = _.mapKeys(options, (v, k) => {
            const hyphenated = k.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
            return `data-fp-${hyphenated}`
        })
        return (
            <div ref="filepicker" className="filepicker">
                <input type={mode} onChange={this.onChange} {...opts}/>
                <div className="filepicker-drag-drop-pane" id="filepicker-drag-drop-pane" {...opts}>
                    <span className="filepicker-drag-drop-text">{ dragText }</span>
                    <button type="button" className="tc-btn tc-btn-secondary tc-btn-sm">Add File</button>
                </div>
                <div className="filepicker-progress" ref="filepickerProgress"></div>
            </div>
        )
    }
}

FilePicker.propTypes = {
    apiKey: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    onSuccess: PropTypes.func.isRequired
}

export default FilePicker

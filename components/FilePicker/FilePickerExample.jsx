import React from 'react'
import FilePicker from './FilePicker'

const FilePickerExample = () => {
  const onFileUpload = (files) => {
    alert(JSON.stringify(files, null, 2))
  }

  const FILE_PICKER_API_KEY = process.env.FILE_PICKER_API_KEY_DEV
  const FILE_PICKER_SUBMISSION_CONTAINER_NAME = process.env.FILE_PICKER_SUBMISSION_CONTAINER_NAME || 'submission-staging-dev'
  const FILE_PICKER_CNAME = process.env.FILE_PICKER_CNAME || 'fs.topcoder.com'
  const FILE_PICKER_FROM_SOURCES = process.env.FILE_PICKER_FROM_SOURCES || ['local_file_system', 'googledrive', 'dropbox']
  const FILE_PICKER_ACCEPT = process.env.FILE_PICKER_ACCEPT || ['.bmp', '.gif', '.jpg', '.tex', '.xls', '.xlsx', '.doc', '.docx', '.zip', '.txt', '.pdf', '.png', '.ppt', '.pptx', '.rtf', '.csv']

  const options = {
    apiKey: FILE_PICKER_API_KEY,
    cname: FILE_PICKER_CNAME,
    buttonText: 'Add File',
    buttonClass: 'tc-btn tc-btn-secondary tc-btn-sm',
    dragText: 'Drag and drop your files here',
    language: 'en',
    location: 's3',
    storeContainer: FILE_PICKER_SUBMISSION_CONTAINER_NAME,
    fromSources: FILE_PICKER_FROM_SOURCES,
    accept: FILE_PICKER_ACCEPT,
    path: 'PROJECT_ATTACHMENTS/320',
    multiple: 'true',
    services: ['COMPUTER', 'GOOGLE_DRIVE', 'BOX', 'DROPBOX', 'SKYDRIVE']
  }

  return (
    <div>
      <FilePicker apiKey={FILE_PICKER_API_KEY} mode="filepicker-dragdrop" options={options} onSuccess={onFileUpload} />
    </div>
  )

}

module.exports = FilePickerExample

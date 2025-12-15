window.config = {
  routerBasename: '/',
  showStudyList: true,

  servers: {
    dicomWeb: [
      {
        name: 'Orthanc',
        qidoRoot: 'http://localhost:8042/dicom-web',
        wadoRoot: 'http://localhost:8042/dicom-web',
        wadoUriRoot: 'http://localhost:8042/wado',
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        default: true,
      },
      {
        name: 'DCM4CHEE',
        qidoRoot: 'http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
        wadoRoot: 'http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
        imageRendering: 'wadors',
      }
    ]
  }
};

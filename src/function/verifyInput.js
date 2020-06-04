export function VerifyEmail(values) {
  if (!values) {
    return 'Email Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
    return 'Invalid Email';
  } else {
    return '';
  }
}

export function VerifyPasswordStrenght(values) {
  if (!values) {
    return 'Password Required';
  } else if (
    !/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(
      values
    )
  ) {
    return "Password isn't strong enought";
  } else {
    return '';
  }
}

export function VerifyText(values, errorText) {
  if (!values) {
    return errorText;
  } else if (!/[a-zA-Z]/.test(values)) {
    return errorText;
  } else {
    return '';
  }
}

export function VerifyFile(fileToVerify, verificationCriteria) {
  if (fileToVerify && typeof fileToVerify.name === 'string') {
    const extensionFile = fileToVerify.name.split('.')[1];
    if (
      verificationCriteria.extensionList.indexOf(extensionFile) != 1 &&
      fileToVerify.size <= verificationCriteria.size
    ) {
      return '';
    } else {
      return 'Upload a correct file';
    }
  } else {
    return 'File Required';
  }
}

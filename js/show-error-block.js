const alertShowTime = 10000;

const showError = function (message)  {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = 500;
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = 0;
  errorContainer.style.right = 0;
  errorContainer.style.top = '200px';
  errorContainer.style.padding = '20px 10px';
  errorContainer.style.fontSize = '30px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.color = 'red';
  errorContainer.style.background = 'yellow';

  errorContainer.textContent = message;

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, alertShowTime);
};

export{showError};

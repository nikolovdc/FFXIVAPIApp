// components/modal.js

/**  
 * BuildModal
 * 
 */
function BuildModal({ size = "small", className, title, onClose = HideModal, closeBut = "x", 
					  children, onConfirm, confirmBut, onCancel, cancelBut }) {
	
	let modal, modalHeader, modalBody, modalFooter, t1, modalCloseBut, modalConfirmBut, modalCancelBut;

	const overlayDiv = document.getElementById("modal-overlay");
	const selectorName = `modal-container ${size} ${className || ''}`.trim();
	const selectorQuery = '.' + selectorName.split(' ').join('.');
	modal = document.querySelector(selectorQuery);

	if (!modal) {
		modal = document.createElement('div');
		modal.className = selectorName;

		modalHeader = document.createElement('div');
		modalHeader.className = 'modal-header';
		t1 = document.createElement('h1');
		modalHeader.appendChild(t1);
	
		modalCloseBut = document.createElement('button');
		modalHeader.appendChild(modalCloseBut);
		modal.appendChild(modalHeader);

		modalBody = document.createElement('div');
		modalBody.className = 'modal-body';
		modal.appendChild(modalBody);
		
		modalFooter = document.createElement('div');
		modalFooter.className = 'modal-footer';
		if (confirmBut) {
			modalConfirmBut = document.createElement('button');
			modalFooter.appendChild(modalConfirmBut);
		}
		if (cancelBut) {
			modalCancelBut = document.createElement('button');
			modalFooter.appendChild(modalCancelBut);
		}
		modal.appendChild(modalFooter);
		overlayDiv.appendChild(modal);
	} else {
		modalHeader = modal.querySelector('.modal-header');
  		modalBody = modal.querySelector('.modal-body');
  		modalFooter = modal.querySelector('.modal-footer');
  		modalCloseBut = modalHeader.querySelector('button');
  		modalConfirmBut = modalFooter.querySelector('button:nth-child(1)');
  		modalCancelBut = modalFooter.querySelector('button:nth-child(2)');
	}

	if (title) {
		t1.textContent = title;
	}
	
	modalCloseBut.innerHTML = '';
	modalCloseBut.onclick = onClose;
	modalCloseBut.append(closeBut);

	modalBody.innerHTML = '';
	if (children) modalBody.append(children);
	
	modalConfirmBut.innerHTML = '';
	if (typeof onConfirm === "function" && confirmBut) {
		modalConfirmBut.onclick = onConfirm;
		modalConfirmBut.append(confirmBut);
		modalConfirmBut.style.display = "flex";
	} else {
		modalConfirmBut.style.display = "none";
	}

	modalCancelBut.innerHTML = '';
	if (typeof onCancel === "function" && cancelBut) {
		modalCancelBut.onclick = onCancel;
		modalCancelBut.append(cancelBut);
		modalCancelBut.style.display = "flex";
	} else {
		modalCancelBut.style.display = "none";
	}
};

function ToggleModalDisplay(size = 'small', className = '', onShow = 'false') {
	const selector = `.modal-container.${size}${className ? '.' + className : ''}`;
	const modal = document.querySelector(selector);
	modal.style.display = onShow ? "flex" : 'none';
};

export {
	BuildModal,
	ToggleModalDisplay
};
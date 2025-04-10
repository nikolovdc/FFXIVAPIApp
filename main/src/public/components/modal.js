// components/modal.js

/**  
 * BuildModal
 * 
 */
function BuildModal({ size = "small", className, title, onClose, closeBut = "x", 
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
		t1.className = 'modal-header-title';
		modalHeader.appendChild(t1);
	
		modalCloseBut = document.createElement('button');
		modalCloseBut.className = 'modal-button-close';
		modalHeader.appendChild(modalCloseBut);
		modal.appendChild(modalHeader);

		modalBody = document.createElement('div');
		modalBody.className = 'modal-body';
		modal.appendChild(modalBody);
		
		modalFooter = document.createElement('div');
		modalFooter.className = 'modal-footer';
		if (confirmBut) {
			modalConfirmBut = document.createElement('button');
			modalConfirmBut.className = 'modal-button-confirm';
			modalFooter.appendChild(modalConfirmBut);
		}
		if (cancelBut) {
			modalCancelBut = document.createElement('button');
			modalCancelBut.className = 'modal-button-cancel';
			modalFooter.appendChild(modalCancelBut);
		}
		modal.appendChild(modalFooter);
		modal.setAttribute("aria-modal", "true");
		modal.setAttribute('role', 'dialog');
		overlayDiv.appendChild(modal);
	} else {
		modalHeader = modal.querySelector('.modal-header');
		t1 = modalHeader.querySelector('.modal-header-title');
  		modalBody = modal.querySelector('.modal-body');
  		modalFooter = modal.querySelector('.modal-footer');
  		modalCloseBut = modalHeader.querySelector('.modal-button-close');
  		modalConfirmBut = modalFooter.querySelector('.modal-button-confirm');
  		modalCancelBut = modalFooter.querySelector('.modal-button-cancel');
	}

	if (title) {
		t1.textContent = title;
	}
	
	modalCloseBut.innerHTML = '';
	if (onClose && typeof onClose === "function") {
		modalCloseBut.onclick = onClose;
	} else {
		console.log("This is the button: ", modalCloseBut);
		modalCloseBut.onclick = () => {
			ToggleModalDisplay(size, className, false)
		};
	}
	modalCloseBut.append(closeBut);

	modalBody.innerHTML = '';
	if (children) modalBody.append(children);
	
	if (confirmBut) {
		modalConfirmBut.innerHTML = '';
		if (typeof onConfirm === "function" && confirmBut) {
			modalConfirmBut.onclick = onConfirm;
			modalConfirmBut.append(confirmBut);
			modalConfirmBut.style.display = "block";
		} else {
			modalConfirmBut.style.display = "none";
		}
	}
	if (cancelBut) {
		modalCancelBut.innerHTML = '';
		if (typeof onCancel === "function" && cancelBut) {
			modalCancelBut.onclick = onCancel;
			modalCancelBut.append(cancelBut);
			modalCancelBut.style.display = "block";
		} else {
			modalCancelBut.style.display = "none";
		}
	}
	ToggleModalDisplay(size, className, true);
};

function ToggleModalDisplay(size = 'small', className = '', onShow = 'false') {
	console.log("Triggered");
	const selector = `.modal-container.${size}${className ? '.' + className : ''}`;
	const modal = document.querySelector(selector);
	if (onShow) {
		document.body.style.overflow = 'hidden';
		modal.style.display = "block";
	} else {
		document.body.style.overflow = '';
		modal.style.display = "none";
	}
};

export {
	BuildModal,
	ToggleModalDisplay
};

function BuildModal({size = "small", className, title, onClose, closeBut = "x", children, onConfirm, confirmBut, onCancel, cancelBut}) {
	const mainBody = document.getElementById("main-contents");
};

<div className='modal-overlay'>
	    <div className={`modal-container ${size} ${className}`}>
			<div className="modal-header">
			  <h1>{title}</h1>
			  {onClose && (
				<Button onClick={onClose}>
				  {closeBut}
				</Button>
			  )}
			</div>
			<div className='modal-body'>
				{children}
			</div>
			<div className='modal-footer'>
			  {onConfirm && (
				<Button onClick={onConfirm}>
				  {confirmBut}
				</Button>
			  )}
			  {onCancel && (
				<Button onClick={onCancel}>
				  {cancelBut}
				</Button>
			  )}
			</div>
		</div>
	  </div>
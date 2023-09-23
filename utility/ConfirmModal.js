import style from "./ConfirmModal.module.css";

function ConfirmModal(props) {
  function onCancel() {
    props.onCancel();
  }

  function onConfirm() {
    props.onConfirm();
  }

  const buttonClasses = style.btn + " " + style["btn--alt"];

  return (
    <div className={style.all}>
      <div className={style.modal}>
        <div className={style.closeIcon} onClick={onCancel}>
          <i className="fa fa-close"></i>
        </div>
        <h6 className={style.text}>Are you sure want to delete?</h6>
        <div style={{ marginBottom: "50px" }}>
          <button className={buttonClasses} onClick={onCancel}>
            Cancel
          </button>

          {/* <div className="ms-2 col-md-5"> */}
          <button
            className={style.btn}
            onClick={onConfirm}
            //
          >
            Confirm
          </button>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;

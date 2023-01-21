export default function FormInput(props) {
  return (
    <div className="popup__input-wrap">
      <input { ...props } className="popup__input"
             id={ `popup-edit-input-${ props.id }` }/>
      <span id={ `popup-edit-input-${ props.id }-error` } className="popup__input-error"></span>
    </div>
  );
}

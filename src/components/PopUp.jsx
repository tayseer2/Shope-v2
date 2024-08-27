export default function PopUp() {
  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Your Order Has Been Successfully Placed!</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-white p-3 font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all duration-500">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

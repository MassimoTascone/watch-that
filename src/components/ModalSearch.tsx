export function ModalSearch() {
  return (
    <>
      {/* Open the modal using ID.showModal() method */}
      <button className="btn" onClick={() => window.my_modal_2.showModal()}>
        open modal
      </button>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-accent w-full max-w-xs"
          />
        </form>
        <form method="dialog" className="modal-backdrop bg-[#1D232Acc]">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

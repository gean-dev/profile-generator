import {
  Dialog,
  DialogControlledProps,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "solid-headless";
import { ParentProps, createSignal } from "solid-js";
import { ImageCropper } from "./ImageCropper";

export type ModalProps = DialogControlledProps & ParentProps;

export const Modal = (props: ModalProps) => {
  return (
    <Transition appear show={props.isOpen}>
      <Dialog
        isOpen
        class="fixed inset-0 z-10 overflow-y-auto"
        onClose={props.onClose}
      >
        <div class="min-h-screen px-4 flex items-center justify-center">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-gray-900 bg-opacity-50" />
          </TransitionChild>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <DialogTitle
                as="h3"
                class="text-xl font-semibold leading-6 text-gray-900"
              >
                Crop your picture!
              </DialogTitle>
              <div class="mt-2">{props.children}</div>
              <div class="mt-4 flex justify-end">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-xl border border-transparent bg-violet-100 px-4 py-2 text-sm font-bold tracking-wide text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                  onClick={props.onClose}
                >
                  Done
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export const ModalButton = () => {
  const [isOpen, setOpen] = createSignal(false);
  return (
    <>
      <button
        type="button"
        class="inline-flex justify-center rounded-xl border border-transparent bg-violet-100 px-4 py-2 text-sm font-bold tracking-wide text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
        onClick={() => setOpen(true)}
      >
        Open
      </button>
      <Modal isOpen={isOpen()} onClose={() => setOpen(false)}>
        <ImageCropper />
      </Modal>
    </>
  );
};

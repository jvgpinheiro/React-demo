import { ComponentProps as PersonFormProps } from '../../components/PeopleComponent/PersonFormComponent/PersonFormComponent';

type AllComponentProps = {
    '': undefined;
    'person-form': PersonFormProps;
};
export type ModalTypes = keyof AllComponentProps;
export type TakePropsFromType<T extends ModalTypes> = AllComponentProps[T];
type SubscriberCallback = <T extends ModalTypes>(currentModal: T, props?: TakePropsFromType<T>) => void;

let currentModal: ModalTypes = '';
let currentProps: TakePropsFromType<ModalTypes> = undefined;
const openListeners = new Map<ModalTypes, Set<SubscriberCallback>>();
const closeListeners = new Map<ModalTypes, Set<SubscriberCallback>>();

export function openModal<T extends ModalTypes>(modal: T, props?: TakePropsFromType<T>): void {
    currentModal = modal;
    currentProps = props;
    notifyOpen(currentModal);
}

export function closeModal(modal: ModalTypes): void {
    if (currentModal !== modal) {
        return;
    }
    notifyClose(currentModal);
    currentModal = '';
    currentProps = undefined;
}

export function closeAnyModal(): void {
    notifyClose(currentModal);
    currentModal = '';
}

export function isAnyModalOpen(): boolean {
    return currentModal !== '';
}

function notifyOpen<T extends ModalTypes>(modal: T): void {
    notify(openListeners, '');
    notify(openListeners, modal);
}

function notifyClose<T extends ModalTypes>(modal: T): void {
    notify(closeListeners, '');
    notify(closeListeners, modal);
}

function notify<T extends ModalTypes>(map: Map<ModalTypes, Set<SubscriberCallback>>, modalListenerType: T): void {
    const storedListeners: Set<SubscriberCallback> = map.get(modalListenerType) ?? new Set([]);
    storedListeners.forEach((callback) => callback(currentModal, currentProps));
}

export function subscribeOpen(callback: SubscriberCallback, modal: ModalTypes = ''): void {
    const storedListeners: Set<SubscriberCallback> = openListeners.get(modal) ?? new Set([]);
    storedListeners.add(callback);
    openListeners.set(modal, storedListeners);
}

export function unsubscribeOpen(callback: SubscriberCallback, modal: ModalTypes = ''): void {
    const storedListeners: Set<SubscriberCallback> = openListeners.get(modal) ?? new Set([]);
    storedListeners.delete(callback);
}

export function subscribeClose(callback: SubscriberCallback, modal: ModalTypes = ''): void {
    const storedListeners: Set<SubscriberCallback> = closeListeners.get(modal) ?? new Set([]);
    storedListeners.add(callback);
    closeListeners.set(modal, storedListeners);
}

export function unsubscribeClose(callback: SubscriberCallback, modal: ModalTypes = ''): void {
    const storedListeners: Set<SubscriberCallback> = closeListeners.get(modal) ?? new Set([]);
    storedListeners.delete(callback);
}

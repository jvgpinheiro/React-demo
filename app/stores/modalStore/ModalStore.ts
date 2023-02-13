import {} from '../../components/PeopleComponent/PersonFormComponent/PersonFormComponent';

export type ModalTypes = '' | 'person-form';
type SubscriberCallback = (currentModal: ModalTypes) => void;

let currentModal: ModalTypes = '';
const openListeners = new Map<ModalTypes, Set<SubscriberCallback>>();
const closeListeners = new Map<ModalTypes, Set<SubscriberCallback>>();

export function openModal(modal: ModalTypes): void {
    currentModal = modal;
    notifyOpen();
}

export function closeModal(modal: ModalTypes): void {
    if (currentModal !== modal) {
        return;
    }
    notifyClose();
    currentModal = '';
}

export function closeAnyModal(): void {
    notifyClose();
    currentModal = '';
}

export function isAnyModalOpen(): boolean {
    return currentModal !== '';
}

function notifyOpen(): void {
    notify(openListeners, '');
    notify(openListeners, currentModal);
}

function notifyClose(): void {
    notify(closeListeners, '');
    notify(closeListeners, currentModal);
}

function notify(map: Map<ModalTypes, Set<SubscriberCallback>>, modalListenerType: ModalTypes): void {
    const storedListeners: Set<SubscriberCallback> = map.get(modalListenerType) ?? new Set([]);
    storedListeners.forEach((callback) => callback(currentModal));
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

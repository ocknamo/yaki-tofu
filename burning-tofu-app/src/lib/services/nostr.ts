import { createRxNostr, createRxForwardReq, type EventPacket } from 'rx-nostr';
import { verifier } from 'rx-nostr-crypto';
import type { NostrEvent } from '../../types/nostr';

// Create RxNostr instance
export const rxNostr = createRxNostr({
  verifier,
});

// Initialize with relays
export function initializeRelays(relays: string[]) {
  rxNostr.setDefaultRelays(relays);
}

// Publish event to relays
export async function publishEvent(event: NostrEvent): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Publish timeout'));
    }, 10000);

    rxNostr.send(event).subscribe({
      next: (packet: EventPacket) => {
        console.log('Event published:', packet);
      },
      error: (error: Error) => {
        clearTimeout(timeoutId);
        reject(error);
      },
      complete: () => {
        clearTimeout(timeoutId);
        resolve();
      },
    });
  });
}

// Subscribe to events
export function subscribeToEvents(filters: any[]) {
  const req = createRxForwardReq();
  return rxNostr.use(req).pipe(req.emit(filters));
}

// Get user's badge definitions
export function getUserBadgeDefinitions(pubkey: string) {
  return subscribeToEvents([
    {
      kinds: [30009],
      authors: [pubkey],
    },
  ]);
}

// Cleanup
export function cleanup() {
  rxNostr.dispose();
}

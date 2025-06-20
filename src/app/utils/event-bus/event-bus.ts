import type { AppEvents } from './event';

export type EventCallback<Payload> = (payload: Payload) => void;

class EventBus<EventMap extends Record<string, object>> {
  private static instance: EventBus<AppEvents>;
  private listeners: {
    [K in keyof EventMap]?: Set<EventCallback<EventMap[K]>>;
  } = {};

  private constructor() {}

  public static getInstance<T extends Record<string, object>>(): EventBus<T> {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus<T>();
    }
    return EventBus.instance as EventBus<T>;
  }

  public subscribe<K extends keyof EventMap>(
    event: K,
    callback: EventCallback<EventMap[K]>,
  ): () => void {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set();
    }
    this.listeners[event].add(callback);
    return () => {
      if (this.listeners[event]) {
        this.listeners[event].delete(callback);
      }
    };
  }

  public publish<K extends keyof EventMap>(event: K, payload: EventMap[K]): void {
    for (const callback of this.listeners[event] ?? []) {
      callback(payload);
    }
  }
}

export const PublishSubscriber = (): EventBus<AppEvents> => EventBus.getInstance<AppEvents>();

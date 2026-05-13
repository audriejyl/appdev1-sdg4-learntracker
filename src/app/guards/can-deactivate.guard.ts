import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';

/**
 * Component that implements CanDeactivate must have this method
 */
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

/**
 * Functional Deactivate Guard
 * Prevents navigation if there are unsaved changes
 */
export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};

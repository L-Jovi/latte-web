import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Classic from '../../examples/react-classic/src/App.jsx';
import { createClassicStore } from '../../examples/react-classic/src/store.js';
import Modern from '../../examples/react-modern/src/App.tsx';
import {
  createModernStore,
  api,
} from '../../examples/react-modern/src/store.ts';
for (const [name, App, createStore] of [
  ['classic', Classic, createClassicStore],
  ['modern', Modern, createModernStore],
])
  describe(name, () => {
    let store;
    afterEach(() => {
      store?.dispose?.();
      if (name === 'modern') store?.dispatch(api.util.resetApiState());
      vi.unstubAllGlobals();
    });
    it('supports the same title, add, toggle, filter, edit and delete behavior', async () => {
      store = createStore();
      const user = userEvent.setup();
      render(<App store={store} />);
      expect(screen.getByRole('heading', { name: 'Todos' })).toBeTruthy();
      expect(screen.getByRole('checkbox', { name: 'Use Redux' }).checked).toBe(
        false,
      );
      await user.type(
        screen.getByRole('textbox', { name: 'New todo' }),
        'Read the source',
      );
      await user.click(
        screen.getByRole('button', { name: 'Add', exact: true }),
      );
      await user.click(
        screen.getByRole('checkbox', { name: 'Read the source' }),
      );
      await user.click(
        screen.getByRole('button', { name: 'Active', exact: true }),
      );
      expect(
        screen.queryByRole('checkbox', { name: 'Read the source' }),
      ).toBeNull();
      await user.click(
        screen.getByRole('button', { name: 'Completed', exact: true }),
      );
      await user.click(
        screen.getByRole('button', { name: 'Edit', exact: true }),
      );
      await user.clear(screen.getByRole('textbox', { name: 'Edit todo' }));
      await user.type(
        screen.getByRole('textbox', { name: 'Edit todo' }),
        'Explain the source',
      );
      await user.click(
        screen.getByRole('button', { name: 'Save', exact: true }),
      );
      expect(
        screen.getByRole('checkbox', { name: 'Explain the source' }).checked,
      ).toBe(true);
      await user.click(
        screen.getByRole('button', { name: 'Delete', exact: true }),
      );
      expect(
        within(screen.getByRole('list', { name: 'Todo list' })).queryAllByRole(
          'listitem',
        ),
      ).toHaveLength(0);
    });
  });

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { TabsListProps } from '@tod-workspace/ui/components/Tabs';

import Tabs, {
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@tod-workspace/ui/components/Tabs';

const renderTabs = (listProps: TabsListProps = {}) =>
  render(
    <Tabs defaultValue='preview'>
      <TabsList {...listProps}>
        <TabsTrigger value='preview'>Preview</TabsTrigger>
        <TabsTrigger value='code'>Code</TabsTrigger>
      </TabsList>
      <TabsContent value='preview'>Rendered output</TabsContent>
      <TabsContent value='code'>Source code</TabsContent>
    </Tabs>
  );

describe('Tabs', () => {
  it('shows the panel of the tab that is clicked', async () => {
    renderTabs();

    await userEvent.click(screen.getByRole('tab', { name: 'Code' }));

    expect(screen.getByRole('tab', { name: 'Code' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Source code');
  });

  it('uses the default list variant unless one is given', () => {
    renderTabs();

    expect(screen.getByRole('tablist')).toHaveAttribute(
      'data-variant',
      'default'
    );
  });

  it('exposes the line list variant as a data attribute and drops the list background', () => {
    renderTabs({ variant: 'line' });

    expect(screen.getByRole('tablist')).toHaveAttribute('data-variant', 'line');
    expect(screen.getByRole('tablist')).toHaveClass('bg-transparent');
    expect(screen.getByRole('tablist')).not.toHaveClass('bg-muted');
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(
      <Tabs className='tabs-class' defaultValue='preview'>
        <TabsList className='list-class'>
          <TabsTrigger className='trigger-class' value='preview'>
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent className='content-class' value='preview'>
          Rendered output
        </TabsContent>
      </Tabs>
    );

    expect(document.querySelector('[data-slot="tabs"]')).toHaveClass(
      'tabs-class',
      'group/tabs'
    );
    expect(screen.getByRole('tablist')).toHaveClass('list-class', 'bg-muted');
    expect(screen.getByRole('tab')).toHaveClass(
      'trigger-class',
      'rounded-md',
      'outline-none',
      'focus-visible:ring-2'
    );
    expect(screen.getByRole('tabpanel')).toHaveClass('content-class');
  });
});

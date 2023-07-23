import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const DevActionMenu = () => {
    return (
        <NavigationMenu.Root className="relative flex w-full justify-center">
            <NavigationMenu.List className="center shadow-blackA7 m-0 flex list-none rounded-[6px] bg-dark-primary p-1 shadow-[0_2px_10px]">
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="text-brand-primary hover:bg-dark-gray focus:shadow-dark-gray group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                        Actions{' '}
                        <CaretDownIcon
                            className="text-brand-primary relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                            aria-hidden
                        />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto bg-dark-primary">
                        <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
                            <ListItem href="#applications" title="Applications">
                                View Summary of your applications
                            </ListItem>
                            <ListItem href="#profile" title="Edit Profile">
                                Make changes to your profile
                            </ListItem>
                            <ListItem href="/developer/apply" title="Apply">
                                Apply for a new Openings
                            </ListItem>
                        </ul>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="text-brand-primary hover:bg-dark-gray focus:shadow-dark-gray group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                        Overview{' '}
                        <CaretDownIcon
                            className="text-brand-primary relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                            aria-hidden
                        />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto bg-dark-primary">
                        <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
                            <ListItem title="Introduction" href="/docs/primitives/overview/introduction">
                                Build high-quality, accessible design systems and web apps.
                            </ListItem>
                            <ListItem title="Getting started" href="/docs/primitives/overview/getting-started">
                                A quick tutorial to get you up and running with Radix Primitives.
                            </ListItem>
                            <ListItem title="Styling" href="/docs/primitives/guides/styling">
                                Unstyled and compatible with any styling solution.
                            </ListItem>
                            <ListItem title="Animation" href="/docs/primitives/guides/animation">
                                Use CSS keyframes or any animation library of your choice.
                            </ListItem>
                            <ListItem title="Accessibility" href="/docs/primitives/overview/accessibility">
                                Tested in a range of browsers and assistive technologies.
                            </ListItem>
                            <ListItem title="Releases" href="/docs/primitives/overview/releases">
                                Radix Primitives releases and their changelogs.
                            </ListItem>
                        </ul>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                    <NavigationMenu.Link
                        className="text-brand-primary hover:bg-dark-gray focus:shadow-dark-gray block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
                        href="https://github.com/radix-ui"
                    >
                        Github
                    </NavigationMenu.Link>
                </NavigationMenu.Item>

                <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
                    <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
                </NavigationMenu.Indicator>
            </NavigationMenu.List>

            <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
                <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
            </div>
        </NavigationMenu.Root>
    );
};

const ListItem = React.forwardRef(({ className, children, title, ...props } : any, forwardedRef) => (
    <li>
        <NavigationMenu.Link asChild>
            <Link
                className={classNames(
                    'focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-dark-gray block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors',
                    className
                )}
                {...props}
                ref={forwardedRef}
            >
                <div className="text-brand-primary mb-[5px] font-medium leading-[1.2]">{title}</div>
                <p className="text-white leading-[1.4]">{children}</p>
            </Link>
        </NavigationMenu.Link>
    </li>
));

export default DevActionMenu;

// Write types for this component props
//
// Tip: Use `typeof NavigationMenu.defaultProps` as a starting point.
// Tip: Use `|` to join union types. For example, `string | number`.
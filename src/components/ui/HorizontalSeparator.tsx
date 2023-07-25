'use client'

import * as Separator from '@radix-ui/react-separator';

type Props = {
    color: string
}

const HorizontalSeparator = (props: Props) => {
    return (
        <Separator.Root className={`bg-${props.color} data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-1`} />
    )
}

export default HorizontalSeparator
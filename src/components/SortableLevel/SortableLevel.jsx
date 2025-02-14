import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {BiMoveVertical} from "react-icons/bi";

const SortableLevel = (props, children) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div ref={setNodeRef} style={style}>
            <div className='d-flex align-items-start'>
                <OverlayTrigger
                    delay='500'
                    overlay={<Tooltip>Drag to rearrange levels</Tooltip>}>
                    <Button variant='light' size='sm' className='me-1 cursor-drag touch-action-none'
                            {...attributes} {...listeners}>
                        <BiMoveVertical/>
                    </Button>
                </OverlayTrigger>

                {props.children}
            </div>
        </div>
    );
}

export default SortableLevel;
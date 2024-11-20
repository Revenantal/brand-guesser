'use client';
import React, {useState} from 'react';
import {DragDropProvider} from '@dnd-kit/react';
import {useSortable} from '@dnd-kit/react/sortable';
import {move} from '@dnd-kit/helpers';

const styles = {display: 'inline-flex', flexDirection: 'row', gap: 20};

export default function ControlledExample() {
  const [items, setItems] = useState([0, 1, 2, 3]);

  return (
    <DragDropProvider
      onDragEnd={(event) => {
       
        console.log(event.operation.target.sortable);





        setItems((items) => move(items, event));
      }}
    >
      <div style={styles}>
        {items.map((id, index) => (
          <Sortable key={id} id={id} index={index} />
        ))}
      </div>

      <button
                    className="bg-indigo-500 p-2 px-5 rounded-md hover:bg-indigo-700 transition-colors"
                    value="Submit"
                    onClick={(e) => {
                        console.log(items);
                    }}
                >Submit Guess</button>
    </DragDropProvider>
  );
}

function Sortable({id, index}) {
  const {ref} = useSortable({id, index});

  return <button ref={ref}>Item {id}</button>;
}
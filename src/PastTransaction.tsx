// ComponentB.js
import React, { useEffect, useState } from 'react';
import { Box, Divider, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export type TransactionType = 'Income' | 'Expense';

interface ComponentBProps {
    type: TransactionType;
    amount: number;
    description: string;
    id: string;
    onDelete: () => void;
}

const ComponentB: React.FC<ComponentBProps> = ({ type, amount, description, id, onDelete }) => {
    const color = type === 'Income' ? 'green' : 'red';
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleMouseEnter = () => {
            setIsHovered(true);
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
        };

        const boxElement = document.getElementById(id);
        const deleteBttn = document.getElementById('del' + id);

        if (boxElement && deleteBttn) {
            boxElement.addEventListener('mouseenter', handleMouseEnter);
            boxElement.addEventListener('mouseleave', handleMouseLeave);
            deleteBttn.addEventListener('click', onDelete);
        }

        return () => {
            if (boxElement && deleteBttn) {
                boxElement.removeEventListener('mouseenter', handleMouseEnter);
                boxElement.removeEventListener('mouseleave', handleMouseLeave);
                deleteBttn.removeEventListener('click', onDelete);
            }
        };
    }, [id, onDelete]);

    return (
        <div
            style={{
                width: '530px',
                display: 'flex',
                alignItems: 'center',
            }}
            id={id}
        >
            <span
                style={{
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '500px',
                    backgroundColor: '#ffffff',
                    marginTop: '5px',
                    marginBottom: '5px',
                }}
            >
                <span style={{ marginLeft: '10px' }}>{description}</span>

                <span style={{ marginLeft: 'auto', marginRight: '5px' }}>
                    {type === 'Income' ? '+' : '-'}${amount}
                </span>
                <Divider orientation="vertical" flexItem sx={{ backgroundColor: color, height: '100%', width: 3 }} />
            </span>
            <div id={'del' + id} style={{ height: '30px' }}>
                {isHovered &&
                    <ClearIcon sx={{ height: '100%', backgroundColor: 'red' }} />
                }
            </div>
        </div>
    );
};

export default ComponentB;



import { useEffect, useState } from 'react'
import styles from './Calorie.module.css'
export default function Metrics_Option(props) {
    const isLarge = props.size === 'large'
    return (
        <div className={`${styles['metric-container']} ${isLarge ? styles['metric-container-large'] : ''}`}>
            <div className={styles['index']}>{props.index}</div>
            <div className={`${styles['input-container']} ${isLarge ? styles['input-container-large'] : ''}`}>
                <p>{props.question}</p>
                {props.unit && (
                    <nav>
                        <input className={styles['input']} 
                        type={props.type} 
                        placeholder={props.placeholder}
                        aria-label={props.question}
                        name={props.name}/>
                        <span className={styles['unit-labels']}>{props.unit}</span>
                    </nav>
                )}
                
                {props.options && (
                    <div className={styles['options-container']}>
                        {props.options.map((option, index) => (
                            <div
                                key={option.unit}
                                className={`${styles['metric-card']} ${props.selected === option.unit ? styles['metric-card-selected'] : ''}`}
                                onClick={() => props.onSelect(option.unit)}
                            >
                                {option.image && <img src={option.image} alt={option.label} width={50} height={50} />}
                                <button type="button">{option.label}</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
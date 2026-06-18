import styles from './Calorie.module.css'
export default function CalorieDisplay(props) {
    return (
            <table className={styles['calorie-table']}>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Calorie Intake</th>
                        <th>Weight Gain/Loss</th>
                    </tr>
                    <tr>
                        <td>Maintain Weight</td>
                        <td>{Math.ceil(props.calorie)} calories</td>
                        <td>0kg / week</td>
                    </tr>
                    <tr>
                        <td>Light Weight Loss / Gain</td>
                        <td>{Math.ceil(props.calorie - 300)} / {Math.ceil(props.calorie + 300)} calories</td>
                        <td>0.25kg / week</td>
                    </tr>
                    <tr>
                        <td>Moderate Weight Loss / Gain</td>
                        <td>{Math.ceil(props.calorie - 500)} / {Math.ceil(props.calorie + 500)} calories</td>
                        <td>0.5kg / week</td>
                    </tr>
                    <tr>
                        <td>Intense Weight Loss / Gain</td>
                        <td>{Math.ceil(props.calorie - 1000)} / {Math.ceil(props.calorie + 1000)} calories</td>
                        <td>1kg / week</td>
                    </tr>
                </tbody>
            </table>
    )
}
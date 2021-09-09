import { useSelector } from "react-redux";

const Bills = () => {
    const users = useSelector(state => state.users);
    const bills = useSelector(state => state.bills);

    console.log(bills);

    return(
        <>
        <h2>Bills</h2>
        {
            bills.map(bill => {
                return(
                    <>
                        <h5>{bill.name}</h5>
                        <p>{bill.amount}</p>
                        
                    </>
                );
            })
        }
        </>
    );
}

export default Bills; 
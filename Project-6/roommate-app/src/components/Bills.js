import { useSelector } from "react-redux";
import { Button, Card, Container, Badge } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const Bills = () => {
    const currentUser = useSelector(state => state.loggedInUser);
    const bills = useSelector(state => state.bills);
    const users = useSelector(state => state.users);


    return (
        <Container>
            <div className="sectionHeader">
                <h2>BILLS</h2>
            </div>
            <div className="choresContainer d-flex flex-nowrap">
            {bills.map(bill => {
                let taggedUsers = users.filter(user => (bill.users.includes(user._id)))
                console.log(taggedUsers);
                return (
                        <Card className="m-2 choreCard" bg="info"  style={{ width: '12rem' }}>
                            <Card.Body>
                                <Card.Title>{bill.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Due: {new Date(bill.dueDate).toLocaleDateString()}</Card.Subtitle>
                                <Card.Text>
                                   Php{bill.amount}
                                </Card.Text>
                                <div className="d-flex flex-wrap justify-content-center">
                                    {taggedUsers.map(user => <Badge pill className="m-1" >{user.name}</Badge>)}
                                </div>
                                {bill.status === 'Unpaid' ? <Button variant="outline-success" className="checkIcon" key={uuidv4()}>Paid</Button> : null}
                            </Card.Body>
                        </Card>
                )
            })
        }
        </div>
        </Container>

            // {/* <div>{userBills.bills.map(bill => {
            //     <div>
            //         <h5>{bill.name}</h5>
            //     </div>
            // })}</div> */}

        // <>
        //     <h2>bills</h2>
        //     {userBills.bills.map(bill => { console.log(bill);
        //         <div>
        //             <h5>{bill.name}</h5>
        //         </div>
        //     })}
        // </>
    );
}

export default Bills;
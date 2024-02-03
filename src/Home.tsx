import React, {
    FC,
    useEffect,
    useState
} from 'react'
import {
    Button,
    Box,
    TextField,
    Typography,
    styled,
    Container
} from '@mui/material'
import {
    AddCircle,
    Filter,
    RemoveCircle
} from '@mui/icons-material';
import PastTransaction, { TransactionType } from './PastTransaction';
import ComponentB from './PastTransaction';
const PAGE_WIDTH = '500px'
const Home: FC = () => {
    const [income, setIncome] = useState<number>(0)
    const [expense, setExpense] = useState<number>(0)
    const [desc, setDesc] = useState<string>('')
    const [amount, setAmount] = useState<number>(0)
    const [transactions, setTransactions] = useState<any[]>([])
    const [idTracker, setIdTracker] = useState<number>(0)
    function enterAmountHandler(e: any) {
        if (/^[0-9]*$/.test(e.target.value)) {
            setAmount(Number(e.target.value))
        }
    }
    function getNewId() {
        const id = idTracker
        setIdTracker(id + 1)
        return String(id)
    }
    function addHandler() {
        if(desc === "") return
        setIncome(income + amount)
        addTransaction('Income')
    }
    function subtractHandler() {
        if(desc !== ""){
            setExpense(expense + amount)
            addTransaction('Expense')
        }
    }
    function transacDescHandler(e: any) {
        if (e.target.value.length <= 50) {
            setDesc(e.target.value)
        }
    }
    function deleteTransac(key: string) {
        const newTransacList = transactions.filter((transaction) => String(transaction.key) !== key);
        setTransactions(newTransacList);
    }

    function addTransaction(type: TransactionType) {
        const newId = getNewId()
        const newTransac = (
            <ComponentB
                description={desc}
                type={type}
                amount={amount}
                id={newId}
                onDelete={() => deleteTransac(newId)}
                key={newId}
            />
        )
        setTransactions([...transactions, newTransac])
    }

    return (

        <div style={{
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box
                sx={{ margin: '20px' }}
            >
                YOUR BALANCE
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    ${income - expense}
                </div>
            </Box>

            <InfoContainer >
                <InfoBox>
                    <Typography variant='body1' fontWeight='bold' fontSize='1.2rem'>
                        income
                    </Typography>
                    <Typography variant='subtitle1' color='green' fontSize='1.2rem'>
                        ${income}
                    </Typography>
                </InfoBox>
                <InfoBox>
                    <Typography variant='subtitle1' fontWeight='bold' fontSize='1.2rem'>
                        expense
                    </Typography>
                    <Typography variant='subtitle1' color='red' fontSize='1.2rem'>
                        ${expense}
                    </Typography>
                </InfoBox>
            </InfoContainer>

            <Box>

                <Typography variant='subtitle1' fontWeight='bold' fontSize='1.2rem' mt="20px">
                    History
                </Typography>
                <LineSeparator />
                <div id='transac-history' style={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                }}>
                    {transactions.map(transaction => transaction)}
                </div>
            </Box>
            <Typography variant='subtitle1' fontWeight='bold' fontSize='1.2rem' mt="20px">
                Add new transaction
            </Typography>

            <LineSeparator />

            <Typography variant='subtitle1'>
                Transaction description
            </Typography>
            <TextField
                label="Enter text"
                variant="filled"
                value={desc}
                error={desc ===""}
                sx={{ width: PAGE_WIDTH }}
                helperText={desc ==="" ? 'Please enter a description' : String(desc.length) + '/50'}
                onChange={(e) => transacDescHandler(e)}
            />

            <Typography variant='subtitle1' mt='10px'>
                Amount
            </Typography>
            <TextField
                label="Enter amount"
                variant="filled"
                sx={{ width: PAGE_WIDTH }}
                value={amount === 0 ? '' : amount}
                onChange={(e) => { enterAmountHandler(e) }}
            />
            <Box mt='10px'>
                <Button
                    variant="contained"
                    startIcon={<AddCircle />}
                    onClick={addHandler}
                    sx={{
                        background: '#12c48b',
                        width: '250px',
                        '&:hover': {
                            backgroundColor: '#12c48b'
                        }
                    }}
                >
                    Add
                </Button>
                <Button
                    variant="contained"
                    startIcon={<RemoveCircle />}
                    onClick={subtractHandler}
                    sx={{
                        background: 'red',
                        width: '250px',
                        '&:hover': {
                            backgroundColor: 'red'
                        }
                    }}
                >
                    Subtract
                </Button>

            </Box>

        </div>
    )
}

const InfoBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '250px'

})

const LineSeparator = styled('hr')({
    background: 'light-grey',
    height: '1px',
    width: PAGE_WIDTH,
    margin: 0,
    marginBottom: '10px'
})

const InfoContainer = styled('div')({
    display: 'flex',
    width: '100%',
    alignSelf: 'center'
})
export default Home



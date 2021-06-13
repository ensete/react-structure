import { gql } from '@apollo/client';

export const TEST_QUERY = gql`
    query GetValueStaked($rowNumber: Int!) {
        dayDatas(first: $rowNumber, orderBy: date, orderDirection: desc) {
            date
            totalStake
        }
    }
`

// const { loading, error, data } = useQuery(VALUE_STAKED, {
//     variables: { rowNumber: convertTextToDays(valueTime) }
// });
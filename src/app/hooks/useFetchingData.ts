import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

export default function useFetchingData() {
  const dispatch = useDispatch();
  const { address } = useSelector((state: any) => state.account);

  useEffect(() => {
    console.log(address);
  }, [address, dispatch]);
}

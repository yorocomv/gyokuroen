import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Input, Button, VStack, Text, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import cs from '../addStyles.module.css';

import { jaKousei } from '../lib/ja-kousei';
import { axiosInst } from './_axios-instance';

const SearchCustomer = () => {
    const [searchName, setSearchName] = useState(null);
    const [customers, setCustomers] = useState([]);
    const { register, handleSubmit } = useForm();

    const onSubmit = d => {
        const searchName = jaKousei(d.search_name);
        setSearchName(searchName);
    };

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const res = await axiosInst.get(`/?search-name=${searchName}`);
                setCustomers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        if (!searchName) return;
        getCustomers();
    }, [searchName]);

    return (
        <>
            <Flex width="100%" position="sticky" top="0" align="center" justify="center" padding={2} bg="gray.700">
                <form className={cs.flexForm} onSubmit={handleSubmit(onSubmit)}>
                    <Input className={cs.fontWeightBold} width="auto" bg="white" {...register("search_name")} />
                    <Button type="submit" marginLeft={1}>検索</Button>
                </form>
                <Link to={'customers/new'} target="_blank">
                    <Text fontWeight="bold" color="green.200" marginLeft={4}>新規登録</Text>
                </Link>
            </Flex>
            <VStack padding={4}>
                {customers.map((customer) => (
                    <Link key={customer.id} to={`customers/${customer.id}`} target="_blank">
                        <Flex className={cs.fontWeightBold} borderWidth='1px' borderColor='blackAlpha.500' borderRadius='md' padding={1}>
                            <Stack padding={[1, 2, 1, 1]} borderRightWidth='1px' borderColor='blackAlpha.500'>
                                <Text>{customer.name1}</Text>
                                <Text>{customer.name2}</Text>
                            </Stack>
                            <Stack padding={1}>
                                <Text>{customer.address1}</Text>
                                <Text>{customer.address2}</Text>
                                <Text>{customer.address3}</Text>
                            </Stack>
                        </Flex>
                    </Link>
                ))}
            </VStack>
        </>
    );
};

export default SearchCustomer;

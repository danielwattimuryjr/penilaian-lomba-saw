import AuthLayout from '@/Layouts/auth-layout';
import { Button } from '@/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import { Icon } from '@/components/icon';
import { Input } from '@/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select';
import { SimplePagination } from '@/components/simple-pagination';
import { SortIndicator } from '@/components/sort-indicator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { useFilter } from '@/hooks/useFilter';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import ContestListOptions from './partials/contest-list-options';

export default function Index(props) {
    const { data: contests, meta, links } = props.contests;
    console.log(props.test);
    const [params, setParams] = useState(props.state);
    useFilter({
        route: route('contests.index'),
        values: params,
        only: ['contests'],
    });

    const handleSort = (newField) => {
        let newDirection = params?.direction ?? 'asc';
        const field = params?.field ?? 'created_at';

        if (newField === field) {
            newDirection = newDirection === 'asc' ? 'desc' : 'asc'; // used newDirection
        }

        setParams({ ...params, field: newField, direction: newDirection });
    };

    return (
        <Container className={'lg:mx-auto lg:max-w-5xl'}>
            <Card>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <div>
                            <CardTitle>Daftar Perlombaan</CardTitle>
                        </div>

                        <Button asChild>
                            <Link href={route('contests.create')}>
                                <Icon icon={'IconCirclePlus'} className={'me-2'} />
                                Perlombaan
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='mb-3 flex items-center justify-between'>
                        <div>
                            <Select value={params?.limit} onValueChange={(e) => setParams({ ...params, limit: e })}>
                                <SelectTrigger className='w-[180px]'>
                                    <SelectValue placeholder={params?.limit ?? 10} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='10'>10</SelectItem>
                                    <SelectItem value='25'>25</SelectItem>
                                    <SelectItem value='50'>50</SelectItem>
                                    <SelectItem value='75'>75</SelectItem>
                                    <SelectItem value='100'>100</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='w-72'>
                            <Input type='text' value={params?.search} onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value }))} placeholder='Pencarian...' />
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[50px] text-center'>#</TableHead>
                                <TableHead onClick={() => handleSort('title')}>
                                    <SortIndicator label='Nama Perlombaan' column='title' field={params?.field} direction={params?.direction} />
                                </TableHead>
                                <TableHead>Created By</TableHead>
                                <TableHead onClick={() => handleSort('created_at')}>
                                    <SortIndicator label='Created At' column='created_at' field={params?.field} direction={params?.direction} />
                                </TableHead>
                                <TableHead onClick={() => handleSort('updated_at')}>
                                    <SortIndicator label='updated' column='updated_at' field={params?.field} direction={params?.direction} />
                                </TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contests.length > 0 ? (
                                <>
                                    {contests.map((contest, i) => (
                                        <TableRow key={i}>
                                            <TableCell className='w-0 py-7 text-center'>{meta.from + i}</TableCell>
                                            <TableCell>{contest.nama_perlombaan}</TableCell>
                                            <TableCell>{contest.created_by}</TableCell>
                                            <TableCell>{contest.created_at}</TableCell>
                                            <TableCell>{contest.updated_at}</TableCell>
                                            <TableCell>
                                                <ContestListOptions contest={contest} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className='animate-pulse py-5 text-center text-base font-semibold text-destructive'>
                                        No Contests.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className='flex items-center justify-between pt-6'>
                    <SimplePagination links={links} meta={meta} />
                </CardFooter>
            </Card>
        </Container>
    );
}

Index.layout = (page) => <AuthLayout title={'Contests'} children={page} />;

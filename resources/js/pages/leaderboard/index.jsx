import AuthLayout from '@/Layouts/auth-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { roundToDecimalPlaces } from '@/lib/utils';

export default function Index({ contest, leaderboard }) {
    return (
        <Container className={'lg:mx-auto lg:max-w-5xl'}>
            <Card>
                <CardHeader>
                    <CardTitle>Leaderboard {contest.nama_perlombaan}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[80px] text-center'>Posisi</TableHead>
                                <TableHead>Nama Peserta</TableHead>
                                <TableHead>Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaderboard.length > 0 ? (
                                <>
                                    {leaderboard.map((data, i) => (
                                        <TableRow>
                                            <TableCell className='w-0 py-7 text-center'>{++i}</TableCell>
                                            <TableCell>{data.user}</TableCell>
                                            <TableCell>{roundToDecimalPlaces(data.final_score)}</TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className='animate-pulse py-5 text-center text-base font-semibold text-destructive'>
                                        Masih Kosong.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Container>
    );
}

Index.layout = (page) => <AuthLayout title={'Leaderboard'} children={page} />;

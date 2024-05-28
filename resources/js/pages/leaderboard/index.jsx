import AuthLayout from '@/Layouts/auth-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { roundToDecimalPlaces } from '@/lib/utils';

export default function Index({ contest, saw_data }) {
    const { variable, sorted } = saw_data;

    console.log(variable);

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
                                {sorted[0].details.map((factor, i) => (
                                    <TableHead key={i} colSpan={2}>{`Nilai ${factor.factor} (${factor.weight * 100}%)`}</TableHead>
                                ))}
                                <TableHead>Score</TableHead>
                            </TableRow>
                            <TableRow>
                                <TableHead />
                                <TableHead />
                                {sorted[0].details.map((factor, i) => (
                                    <>
                                        <TableHead>Nilai</TableHead>
                                        <TableHead>Normalized</TableHead>
                                    </>
                                ))}
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sorted.length > 0 ? (
                                <>
                                    {sorted.map((data, i) => (
                                        <TableRow key={i}>
                                            <TableCell className='w-0 py-7 text-center'>{++i}</TableCell>
                                            <TableCell>{data.user}</TableCell>
                                            {data.details.map((factor, i) => (
                                                <>
                                                    <TableCell key={i}>{factor.score}</TableCell>
                                                    <TableCell key={i}>{roundToDecimalPlaces(factor.normalized_score)}</TableCell>
                                                </>
                                            ))}
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

            <Card>
                <CardHeader>
                    <CardTitle>Variable Penilaian</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[50px] text-center'>#</TableHead>
                                <TableHead>Nama Faktor Penilaian</TableHead>
                                <TableHead>Bobot (Decimal)</TableHead>
                                <TableHead>Nilai Maksimum</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.entries(variable).map(([factor, maxScore], i) => (
                                <TableRow key={i}>
                                    <TableCell className='w-0 py-7 text-center'>{++i}</TableCell>
                                    <TableCell>{factor}</TableCell>
                                    <TableCell>...</TableCell>
                                    <TableCell>{maxScore}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Container>
    );
}

Index.layout = (page) => <AuthLayout title={'Leaderboard'} children={page} />;

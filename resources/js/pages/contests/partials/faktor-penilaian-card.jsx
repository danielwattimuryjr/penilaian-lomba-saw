import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';

export default function FaktorPenilaianCard({ factors }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Faktor Penilaian</CardTitle>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-[50px] text-center'>#</TableHead>
                            <TableHead>Nama Faktor</TableHead>
                            <TableHead>Bobot Penilaian (%)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {factors.length > 0 ? (
                            <>
                                {factors.map((factor, i) => (
                                    <TableRow key={i}>
                                        <TableCell className='w-0 py-7 text-center'> {i + 1}</TableCell>
                                        <TableCell>{factor.nama_faktor}</TableCell>
                                        <TableCell>{`${factor.bobot_penilaian}%`}</TableCell>
                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className='animate-pulse py-5 text-center text-base font-semibold text-destructive'>
                                    No Faktor Penilaian.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

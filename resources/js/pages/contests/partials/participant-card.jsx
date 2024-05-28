import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import AddParticipantDialog from './add-participant-dialog';

export default function ParticipantCard({ participants, contest }) {
    return (
        <Card>
            <CardHeader>
                <div className='flex flex-row items-start justify-between'>
                    <div>
                        <CardTitle>Partisipan Perlombaan</CardTitle>
                    </div>

                    <div>
                        <AddParticipantDialog contest={contest} />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-[50px] text-center'>#</TableHead>
                            <TableHead>Kode Peserta</TableHead>
                            <TableHead>Nama Peserta</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>No. Telp.</TableHead>
                            <TableHead>Bergabung Pada</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {participants.length > 0 ? (
                            <>
                                {participants.map((participant, i) => (
                                    <TableRow key={i}>
                                        <TableCell className='w-0 py-7 text-center'> {i + 1}</TableCell>
                                        <TableCell> {participant.nomor_peserta}</TableCell>
                                        <TableCell> {participant.nama_peserta}</TableCell>
                                        <TableCell> {participant.email}</TableCell>
                                        <TableCell> {participant.nomor_telepon}</TableCell>
                                        <TableCell> {participant.created_at}</TableCell>
                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className='animate-pulse py-5 text-center text-base font-semibold text-destructive'>
                                    No Participants.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

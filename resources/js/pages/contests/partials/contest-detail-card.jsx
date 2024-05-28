import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';

export default function ContestDetailCard({ contest }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Detail Perlombaan</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className='divide-y divide-primary'>
                    <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm font-medium leading-6'>Nama Perlombaan</dt>
                        <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>{contest.nama_perlombaan}</dd>
                    </div>

                    <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                        <dt className='text-sm font-medium leading-6'>Kode Perlombaan</dt>
                        <dd className='mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>{contest.kd_perlombaan}</dd>
                    </div>
                </dl>
            </CardContent>
        </Card>
    );
}

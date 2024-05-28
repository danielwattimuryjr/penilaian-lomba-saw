import AuthLayout from '@/Layouts/auth-layout';
import { Button } from '@/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import { Icon } from '@/components/icon';
import { Input } from '@/components/input';
import InputError from '@/components/input-error';
import { Label } from '@/components/label';
import { Separator } from '@/components/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { getTimeStamp } from '@/lib/get-date';
import { toast } from '@/lib/use-toast';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        kd_contest: '',
        faktor_penilaian: [
            {
                nama_faktor: '',
                bobot_penilaian: 0,
            },
        ],
    });

    function submit(e) {
        e.preventDefault();

        post(route('contests.store'), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Berhasil menambahkan perlombaan baru.',
                    description: getTimeStamp(),
                });
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'Gagal menambahkan perlombaan.',
                    description: getTimeStamp(),
                });
            },
        });
    }

    function handleFaktorPenilaianChange(i, field, value) {
        setData(
            'faktor_penilaian',
            data.faktor_penilaian.map((item, index) => (index === i ? { ...item, [field]: value } : item)),
        );
    }

    function removeFaktorPenilaian(i) {
        const updatedFormPenilaian = data.faktor_penilaian.filter((_, index) => index !== i);
        setData('faktor_penilaian', updatedFormPenilaian);
    }

    function addFaktorPenilaianRow() {
        setData('faktor_penilaian', [
            ...data.faktor_penilaian,
            {
                nama_faktor: '',
                bobot_penilaian: 0,
            },
        ]);
    }

    return (
        <Container className={'lg:mx-auto lg:max-w-5xl'}>
            <Card>
                <CardHeader>
                    <CardTitle>Tambah Perlombaan Baru</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div>
                            <Label htmlFor='title' className={'capitalize'}>
                                nama perlombaan
                            </Label>

                            <Input id='title' name='title' value={data.title} className='mt-1 block w-full' autoFocus onChange={(e) => setData('title', e.target.value)} />

                            <InputError message={errors.title} className='mt-2' />
                        </div>

                        <div className='mt-4'>
                            <Label htmlFor='title' className={'capitalize'}>
                                Kode Perlombaan
                            </Label>

                            <Input id='kd_contest' name='kd_contest' value={data.kd_contest} className='mt-1 block w-full' autoFocus onChange={(e) => setData('kd_contest', e.target.value)} />

                            <InputError message={errors.kd_contest} className='mt-2' />
                        </div>

                        <Separator className='my-4' />

                        <CardTitle>Form Penilaian</CardTitle>

                        <Table className='mt-8'>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='w-[50px] text-center'>#</TableHead>
                                    <TableHead>Nama Faktor</TableHead>
                                    <TableHead>Bobot Penilaian (%)</TableHead>
                                    <TableHead />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.faktor_penilaian.length > 0 ? (
                                    <>
                                        {data.faktor_penilaian.map((faktor, i) => (
                                            <TableRow key={i}>
                                                <TableCell className='w-0 py-7 text-center'>{i + 1}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        <Input type='text' value={faktor.nama_faktor} onChange={(e) => handleFaktorPenilaianChange(i, 'nama_faktor', e.target.value)} />
                                                        <InputError message={errors[`faktor_penilaian.${i}.nama_faktor`]} className='mt-2' />
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <Input type='number' value={faktor.bobot_penilaian} onChange={(e) => handleFaktorPenilaianChange(i, 'bobot_penilaian', e.target.value)} min={0} max={100} />
                                                        <InputError message={errors[`faktor_penilaian.${i}.bobot_penilaian`]} className='mt-2' />
                                                    </div>
                                                </TableCell>
                                                <TableCell className='w-0 py-7 text-center'>
                                                    <Button type='button' variant='outline' className={'text-destructive'} onClick={() => removeFaktorPenilaian(i)}>
                                                        <Icon icon={'IconTableMinus'} className={'me-2'} />
                                                        Hapus
                                                    </Button>
                                                </TableCell>
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
                                <TableRow>
                                    <TableCell colSpan={2} className='py-7'>
                                        Total Bobot
                                    </TableCell>
                                    <TableCell>0%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <Button type='button' className='w-full' onClick={() => addFaktorPenilaianRow()}>
                                            <Icon icon={'IconTablePlus'} className={'me-2'} />
                                            Tambah Faktor Penilaian
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <div className='mt-4 flex items-center justify-end gap-2'>
                            <Button type='button' onClick={() => reset()} disabled={processing} variant='destructive'>
                                Reset
                            </Button>
                            <Button disabled={processing}>
                                {processing && <Icon icon={'IconLoader2'} className={'animate-spin'} />}
                                Save
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

Create.layout = (page) => <AuthLayout title={'Tambah Contest'} children={page} />;

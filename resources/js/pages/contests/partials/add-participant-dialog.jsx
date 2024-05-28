import { Button } from '@/components/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/dialog';
import { Icon } from '@/components/icon';
import { Input } from '@/components/input';
import InputError from '@/components/input-error';
import { Label } from '@/components/label';
import { getTimeStamp } from '@/lib/get-date';
import { toast } from '@/lib/use-toast';
import { useForm } from '@inertiajs/react';

export default function AddParticipantDialog({ contest }) {
    const {
        data,
        setData,
        submit: save,
        processing,
        errors,
        reset,
    } = useForm({
        nama: '',
        email: '',
        nomor_telepon: '',
    });

    function submit() {
        save('post', route('contest_participants.store', contest.kd_perlombaan), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Berhasil menambahkan perlombaan baru.',
                    description: getTimeStamp(),
                });

                reset();
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

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Icon icon={'IconCirclePlus'} className={'me-2'} />
                    Peserta
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Peserta</DialogTitle>
                </DialogHeader>
                <div>
                    <Label htmlFor='title' className={'capitalize'}>
                        Nama Peserta
                    </Label>

                    <Input
                        id='nama'
                        name='nama'
                        value={data.nama}
                        className='mt-1 block w-full'
                        autoFocus
                        onChange={(e) => {
                            setData('nama', e.target.value);
                        }}
                    />

                    <InputError message={errors.nama} className='mt-2' />
                </div>

                <div>
                    <Label htmlFor='title' className={'capitalize'}>
                        Email
                    </Label>

                    <Input
                        id='email'
                        type='email'
                        name='email'
                        value={data.email}
                        className='mt-1 block w-full'
                        onChange={(e) => {
                            setData('email', e.target.value);
                        }}
                    />

                    <InputError message={errors.email} className='mt-2' />
                </div>

                <div>
                    <Label htmlFor='title' className={'capitalize'}>
                        nomor telepon
                    </Label>

                    <Input
                        id='nomor_telepon'
                        type='tel'
                        name='nomor_telepon'
                        value={data.nomor_telepon}
                        className='mt-1 block w-full'
                        onChange={(e) => {
                            setData('nomor_telepon', e.target.value);
                        }}
                        maxLength={13}
                    />

                    <InputError message={errors.nomor_telepon} className='mt-2' />
                </div>
                <DialogFooter>
                    <Button disabled={processing} onClick={() => submit()}>
                        {processing ? <Icon icon={'IconLoader2'} className={'animate-spin'} /> : <Icon icon={'IconDeviceFloppy'} className={'me-2'} />}
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

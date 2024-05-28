import AuthLayout from '@/Layouts/auth-layout';
import { Button } from '@/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import Container from '@/components/container';
import { Icon } from '@/components/icon';
import { Input } from '@/components/input';
import InputError from '@/components/input-error';
import { Label } from '@/components/label';
import { getTimeStamp } from '@/lib/get-date';
import { toast } from '@/lib/use-toast';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Create({ factors, contest, contestParticipant }) {
    const {
        data,
        setData,
        submit: save,
        processing,
        errors,
    } = useForm({
        form: [],
    });

    useEffect(() => {
        const defaultFormPenilaian = factors.map((factor) => ({
            factor_id: factor.id,
            nama_faktor: factor.nama_faktor,
            score: 0,
        }));

        setData('form', defaultFormPenilaian);
    }, [factors]);

    const handleScoreChange = (index, value) => {
        const updatedFormPenilaian = [...data.form];
        updatedFormPenilaian[index].score = value;
        setData('form', updatedFormPenilaian);
    };

    const submit = () => {
        save(
            'post',
            route('participant_score.store', {
                contest: contest,
                contest_participant: contestParticipant,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast({
                        title: 'Berhasil memberikan nilai kepada partisipan.',
                        description: getTimeStamp(),
                    });
                },
                onError: () => {
                    toast({
                        variant: 'destructive',
                        title: 'Gagal memberikan nilai.',
                        description: getTimeStamp(),
                    });
                },
            },
        );
    };

    return (
        <Container className={'lg:mx-auto lg:max-w-5xl'}>
            <Card>
                <CardHeader>
                    <CardTitle>Form Penilaian</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='space-y-4'>
                        {data.form.map((factor, i) => (
                            <div key={i}>
                                <Label htmlFor='title' className={'capitalize'}>
                                    {factor.nama_faktor}
                                </Label>

                                <Input type='number' value={factor.score} className='mt-1 block w-full' onChange={(e) => handleScoreChange(i, e.target.value)} min={0} max={100} />

                                <InputError message={errors[`form.${i}.score`]} className='mt-2' />
                            </div>
                        ))}

                        <div className='mt-4 flex items-center justify-end gap-2'>
                            <Button disabled={processing} type='button' onClick={() => submit()}>
                                {processing && <Icon icon={'IconLoader2'} className={'animate-spin'} />}
                                Save
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
}

Create.layout = (page) => <AuthLayout title={'Participant Score'} children={page} />;

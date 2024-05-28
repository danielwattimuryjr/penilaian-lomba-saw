import AuthLayout from '@/Layouts/auth-layout';
import Container from '@/components/container';
import ContestDetailCard from './partials/contest-detail-card';
import FaktorPenilaianCard from './partials/faktor-penilaian-card';
import ParticipantCard from './partials/participant-card';

export default function Show({ contest }) {
    const { faktor_penilaian, participants } = contest;

    return (
        <Container className={'lg:mx-auto lg:max-w-5xl'}>
            <ContestDetailCard contest={contest} />

            <FaktorPenilaianCard factors={faktor_penilaian} />

            <ParticipantCard participants={participants} contest={contest} />
        </Container>
    );
}

Show.layout = (page) => <AuthLayout title={'Detail Contest'} children={page} />;

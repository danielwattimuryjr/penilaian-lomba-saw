import { Button } from '@/components/button';
import { DropdownDialog } from '@/components/dropdown-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { Icon } from '@/components/icon';
import { getTimeStamp } from '@/lib/get-date';
import { toast } from '@/lib/use-toast';
import { Link, useForm } from '@inertiajs/react';

export default function ContestListOptions({ contest, details = true }) {
    const { delete: destroy } = useForm();

    function deleteContest(contest) {
        destroy(route('contests.destroy', contest), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Perlombaan berhasil dihapus.',
                    description: getTimeStamp(),
                });
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'Gagal menghapus perlombaan.',
                    description: getTimeStamp(),
                });
            },
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='h-7' variant='outline' size='icon'>
                    <Icon icon={'IconDots'} className={'h-5 w-5 stroke-[1.2]'} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {details ? (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={route('contests.show', contest)}>
                                <Icon icon={'IconId'} />
                                Details
                            </Link>
                        </DropdownMenuItem>
                    </>
                ) : null}
                <DropdownMenuSeparator />
                <DropdownDialog description='This action cannot be undone. This will permanently delete contest and remove data from our servers.' action={() => deleteContest(contest)} submit_text='Delete' buttonStyle='destructive'>
                    <Icon icon={'IconTrash'} />
                    Delete Permanently
                </DropdownDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

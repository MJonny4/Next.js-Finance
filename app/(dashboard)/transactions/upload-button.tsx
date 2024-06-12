import { Upload } from 'lucide-react'
import { useCSVReader } from 'react-papaparse'
import { Button } from '../../../components/ui/button'

type UploadButtonProps = {
    onUpload: (results: any) => void
}

export default function UploadButton({ onUpload }: UploadButtonProps) {
    const { CSVReader } = useCSVReader()

    // TODO: Paywall

    return (
        <CSVReader onUploadAccepted={onUpload}>
            {({ getRootProps }: any) => (
                <Button size={'sm'} className='w-full lg:w-auto' {...getRootProps()}>
                    <Upload className='size-4 mr-2' />
                    Import
                </Button>
            )}
        </CSVReader>
    )
}
